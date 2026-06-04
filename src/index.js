require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { webhookRouter } = require('./bot/whatsapp/webhook');
const { logger } = require('./utils/logger');
const config = require('./config/config');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: require('../package.json').version
  });
});

// WhatsApp webhook routes
app.use('/webhook', webhookRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`🤖 WhatsApp AI Bot running on port ${PORT}`);
  logger.info(`📍 Environment: ${config.nodeEnv}`);
  logger.info(`🔗 Webhook: ${config.baseUrl}/webhook`);
});

module.exports = app;