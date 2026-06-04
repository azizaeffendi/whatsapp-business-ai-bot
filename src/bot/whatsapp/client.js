const axios = require('axios');
const config = require('../../config/config');
const { logger } = require('../../utils/logger');

const apiUrl = `${config.whatsapp.apiUrl}/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;
const headers = {
  'Authorization': `Bearer ${config.whatsapp.token}`,
  'Content-Type': 'application/json'
};

async function sendTextMessage(to, text) {
  return sendMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { preview_url: false, body: text }
  });
}

async function sendTemplateMessage(to, templateName, language = 'id', components = []) {
  return sendMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name: templateName, language: { code: language }, components }
  });
}

async function sendInteractiveButtons(to, bodyText, buttons) {
  return sendMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: {
        buttons: buttons.map((btn, i) => ({
          type: 'reply',
          reply: { id: `btn_${i}`, title: btn }
        }))
      }
    }
  });
}

async function sendListMessage(to, headerText, bodyText, buttonText, sections) {
  return sendMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: headerText },
      body: { text: bodyText },
      action: { button: buttonText, sections }
    }
  });
}

async function markAsRead(messageId) {
  return sendMessage({
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId
  });
}

async function sendMessage(payload) {
  try {
    const response = await axios.post(apiUrl, payload, { headers });
    return response.data;
  } catch (err) {
    logger.error('WhatsApp send error:', {
      status: err.response?.status,
      data: err.response?.data,
      payload
    });
    throw err;
  }
}

module.exports = { sendTextMessage, sendTemplateMessage, sendInteractiveButtons, sendListMessage, markAsRead };