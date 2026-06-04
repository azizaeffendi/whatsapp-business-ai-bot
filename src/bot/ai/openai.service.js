const OpenAI = require('openai');
const config = require('../../config/config');
const { logger } = require('../../utils/logger');
const { SYSTEM_PROMPT, CRM_EXTRACTION_PROMPT, SENTIMENT_PROMPT } = require('./prompt.templates');

const openai = new OpenAI({ apiKey: config.openai.apiKey });

// In-memory session store (use Redis in production for multi-instance)
const sessions = new Map();

async function generateReply(userId, userMessage, contextPrompt = null) {
  try {
    // Get or create conversation history
    if (!sessions.has(userId)) {
      sessions.set(userId, []);
    }
    const history = sessions.get(userId);

    // Add user message to history
    history.push({ role: 'user', content: userMessage });

    // Keep last 10 messages to manage token costs
    const recentHistory = history.slice(-10);

    const response = await openai.chat.completions.create({
      model: config.openai.model,
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature,
      messages: [
        { role: 'system', content: contextPrompt || SYSTEM_PROMPT },
        ...recentHistory
      ]
    });

    const reply = response.choices[0].message.content;

    // Add assistant reply to history
    history.push({ role: 'assistant', content: reply });

    // Trim history to prevent unbounded growth
    if (history.length > 20) history.splice(0, 2);

    logger.info(`AI reply generated for user ${userId}`, {
      tokens: response.usage?.total_tokens
    });

    return reply;
  } catch (err) {
    logger.error('OpenAI error:', err);
    throw err;
  }
}

async function extractContactInfo(conversationText) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
      temperature: 0,
      messages: [
        { role: 'system', content: CRM_EXTRACTION_PROMPT },
        { role: 'user', content: conversationText }
      ]
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error('CRM extraction error:', err);
    return null;
  }
}

async function analyzeSentiment(message) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0,
      messages: [
        { role: 'system', content: SENTIMENT_PROMPT },
        { role: 'user', content: message }
      ]
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error('Sentiment analysis error:', err);
    return { sentiment: 'neutral', urgency: 'low', needsHuman: false };
  }
}

function clearSession(userId) {
  sessions.delete(userId);
}

module.exports = { generateReply, extractContactInfo, analyzeSentiment, clearSession };