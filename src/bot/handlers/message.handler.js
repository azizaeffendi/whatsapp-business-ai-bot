const { sendTextMessage, sendInteractiveButtons, markAsRead } = require('../whatsapp/client');
const { generateReply, analyzeSentiment, extractContactInfo } = require('../ai/openai.service');
const { handleBookingFlow } = require('./booking.handler');
const { updateCRM } = require('./crm.handler');
const { logger } = require('../../utils/logger');

// Track active booking flows
const bookingFlows = new Map();

async function handleIncomingMessage({ message, contact, metadata }) {
  const { id: messageId, from: userId, type, timestamp } = message;
  const userName = contact?.profile?.name || 'Pelanggan';

  logger.info(`Incoming ${type} from ${userId} (${userName})`);

  // Mark message as read (show blue ticks)
  await markAsRead(messageId).catch(() => {});

  // Only handle text messages (extend here for image, audio, etc.)
  if (type !== 'text') {
    await sendTextMessage(userId, 'Maaf, saat ini saya hanya bisa memproses pesan teks. Silakan ketikkan pertanyaan atau permintaan Anda 😊');
    return;
  }

  const userText = message.text?.body?.trim();
  if (!userText) return;

  try {
    // Check for greeting / reset keywords
    const lowerText = userText.toLowerCase();
    if (['halo', 'hi', 'hello', 'hai', 'mulai', 'start', 'menu'].some(k => lowerText.includes(k))) {
      await sendGreeting(userId, userName);
      return;
    }

    // Check for booking intent
    if (['booking', 'reservasi', 'daftar', 'appointment', 'jadwal', 'pesan'].some(k => lowerText.includes(k))) {
      bookingFlows.set(userId, { step: 'collect_name', data: {} });
    }

    // Handle active booking flow
    if (bookingFlows.has(userId)) {
      const result = await handleBookingFlow(userId, userText, bookingFlows);
      if (result.message) await sendTextMessage(userId, result.message);
      if (result.completed) {
        bookingFlows.delete(userId);
        await updateCRM(userId, userName, { bookingData: result.booking });
      }
      return;
    }

    // Analyze sentiment for escalation detection
    const sentiment = await analyzeSentiment(userText);
    if (sentiment.needsHuman) {
      await sendTextMessage(userId,
        '🙏 Saya memahami situasi Anda. Izinkan saya menghubungkan Anda dengan tim kami yang akan segera membantu.\n\nTim kami akan merespons dalam 5-10 menit ya.'
      );
      logger.warn(`Human escalation triggered for ${userId}: ${userText}`);
      return;
    }

    // Generate AI reply
    const reply = await generateReply(userId, userText);
    await sendTextMessage(userId, reply);

    // Background: extract and save contact info
    extractContactInfo(userText).then(info => {
      if (info) updateCRM(userId, userName, info).catch(() => {});
    });

  } catch (err) {
    logger.error('Message handling error:', err);
    await sendTextMessage(userId, 'Maaf, terjadi kesalahan sementara. Mohon coba lagi dalam beberapa saat ya 🙏');
  }
}

async function sendGreeting(userId, name) {
  const greeting = `Halo ${name}! 👋 Selamat datang!

Saya *${process.env.BOT_NAME || 'Sari'}*, asisten virtual yang siap membantu Anda.

Apa yang bisa saya bantu hari ini?`;

  await sendInteractiveButtons(userId, greeting, [
    'Informasi Produk/Layanan',
    'Booking / Reservasi',
    'Status Pesanan'
  ]);
}

module.exports = { handleIncomingMessage };