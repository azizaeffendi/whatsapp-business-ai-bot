module.exports = {
  // Server
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean),

  // WhatsApp
  whatsapp: {
    token: process.env.WHATSAPP_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    apiVersion: 'v18.0',
    apiUrl: 'https://graph.facebook.com'
  },

  // OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS, 10) || 500,
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7
  },

  // Database
  database: {
    url: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    sessionTtl: 3600  // 1 hour
  },

  // Bot Persona
  persona: {
    name: process.env.BOT_NAME || 'Sari',
    businessName: process.env.BUSINESS_NAME || 'Bisnis Anda',
    language: process.env.BOT_LANGUAGE || 'id',
    businessHours: {
      open: process.env.BUSINESS_OPEN || '08:00',
      close: process.env.BUSINESS_CLOSE || '21:00',
      timezone: process.env.TIMEZONE || 'Asia/Jakarta'
    }
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100
  },

  // Security
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret',

  // Admin
  adminWhatsapp: process.env.ADMIN_WHATSAPP_NUMBER
};