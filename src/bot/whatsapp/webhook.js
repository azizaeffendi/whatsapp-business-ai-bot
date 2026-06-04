const express = require('express');
const router = express.Router();
const { handleIncomingMessage } = require('../handlers/message.handler');
const { logger } = require('../../utils/logger');
const config = require('../../config/config');

// Webhook verification (GET) — required by Meta
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
    logger.info('Webhook verified successfully');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed');
  res.status(403).json({ error: 'Forbidden' });
});

// Incoming messages (POST)
router.post('/', async (req, res) => {
  // Immediately return 200 to Meta (required within 5s)
  res.status(200).json({ status: 'received' });

  try {
    const body = req.body;
    if (body.object !== 'whatsapp_business_account') return;

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.length) return;

    const message = value.messages[0];
    const contact = value.contacts?.[0];
    const metadata = value.metadata;

    await handleIncomingMessage({ message, contact, metadata });
  } catch (err) {
    logger.error('Webhook processing error:', err);
  }
});

module.exports = { webhookRouter: router };