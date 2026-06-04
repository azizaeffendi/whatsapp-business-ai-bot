function formatPhoneNumber(phone) {
  if (!phone) return null;
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) cleaned = '62' + cleaned.slice(1);
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  return cleaned;
}

function isWithinBusinessHours(openTime, closeTime, timezone = 'Asia/Jakarta') {
  const now = new Date().toLocaleTimeString('en-US', {
    timeZone: timezone, hour12: false, hour: '2-digit', minute: '2-digit'
  });
  return now >= openTime && now <= closeTime;
}

function sanitizeInput(text) {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '').trim().slice(0, 1000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function truncate(text, maxLength = 200) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

module.exports = { formatPhoneNumber, isWithinBusinessHours, sanitizeInput, sleep, truncate };