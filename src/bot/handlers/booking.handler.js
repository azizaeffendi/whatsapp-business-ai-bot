const { logger } = require('../../utils/logger');

const BOOKING_STEPS = {
  collect_name: {
    question: '📝 Boleh saya tahu nama lengkap Anda?',
    field: 'name',
    next: 'collect_service'
  },
  collect_service: {
    question: '💼 Layanan apa yang ingin Anda booking?\n\n1. Konsultasi\n2. Treatment\n3. Lainnya (sebutkan)',
    field: 'service',
    next: 'collect_date'
  },
  collect_date: {
    question: '📅 Tanggal dan jam berapa yang Anda inginkan?\n\n_Contoh: Senin 9 Juni jam 14:00_',
    field: 'datetime',
    next: 'collect_phone'
  },
  collect_phone: {
    question: '📱 Nomor WhatsApp aktif untuk konfirmasi?\n\n_Contoh: 08123456789_',
    field: 'phone',
    next: 'collect_notes'
  },
  collect_notes: {
    question: '📋 Ada catatan khusus? (Ketik "-" jika tidak ada)',
    field: 'notes',
    next: 'confirm'
  }
};

async function handleBookingFlow(userId, userText, bookingFlows) {
  const flow = bookingFlows.get(userId);
  if (!flow) return { message: null, completed: false };

  const currentStep = flow.step;

  // Confirm step
  if (currentStep === 'confirm') {
    const text = userText.toLowerCase();
    if (text.includes('ya') || text.includes('yes') || text.includes('konfirmasi') || text.includes('benar')) {
      const booking = { ...flow.data, confirmedAt: new Date().toISOString(), status: 'confirmed' };
      logger.info(`Booking confirmed for ${userId}:`, booking);

      const confirmMsg = `✅ *Booking Dikonfirmasi!*

👤 Nama: ${booking.name}
💼 Layanan: ${booking.service}
📅 Jadwal: ${booking.datetime}
📱 Kontak: ${booking.phone}
📝 Catatan: ${booking.notes || '-'}

🔔 Reminder akan dikirim H-1 ke nomor Anda.
Sampai jumpa dan terima kasih! 🙏`;

      return { message: confirmMsg, completed: true, booking };
    } else {
      bookingFlows.set(userId, { step: 'collect_name', data: {} });
      return { message: 'Baik, mari kita mulai ulang. Siapa nama lengkap Anda?' };
    }
  }

  // Collect data steps
  const step = BOOKING_STEPS[currentStep];
  if (!step) return { message: null, completed: false };

  // Save the answer
  flow.data[step.field] = userText;

  // Move to next step
  if (step.next === 'confirm') {
    flow.step = 'confirm';
    bookingFlows.set(userId, flow);

    const summary = `📋 *Ringkasan Booking Anda:*

👤 Nama: ${flow.data.name}
💼 Layanan: ${flow.data.service}
📅 Jadwal: ${flow.data.datetime}
📱 Kontak: ${flow.data.phone}
📝 Catatan: ${flow.data.notes || '-'}

Apakah data sudah benar? Ketik *Ya* untuk konfirmasi atau *Tidak* untuk mengulang.`;

    return { message: summary, completed: false };
  }

  flow.step = step.next;
  bookingFlows.set(userId, flow);

  return { message: BOOKING_STEPS[step.next].question, completed: false };
}

module.exports = { handleBookingFlow };