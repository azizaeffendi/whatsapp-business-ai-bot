const { logger } = require('../../utils/logger');
const config = require('../../config/config');

// In-memory store (replace with real DB/Airtable/Notion in production)
const contacts = new Map();

async function updateCRM(userId, name, data) {
  try {
    const existing = contacts.get(userId) || { userId, createdAt: new Date().toISOString(), interactions: 0 };

    const updated = {
      ...existing,
      name: data.name || existing.name || name,
      phone: data.phone || existing.phone || userId,
      email: data.email || existing.email,
      interest: data.interest || existing.interest,
      intent: data.intent || existing.intent || 'cold',
      notes: data.notes || existing.notes,
      lastInteraction: new Date().toISOString(),
      interactions: existing.interactions + 1
    };

    if (data.bookingData) {
      updated.bookings = [...(existing.bookings || []), data.bookingData];
    }

    contacts.set(userId, updated);
    logger.info(`CRM updated for ${userId}:`, { intent: updated.intent, interactions: updated.interactions });

    // Push to external CRM if configured
    if (config.airtable?.apiKey) await pushToAirtable(updated);
    if (config.notion?.apiKey) await pushToNotion(updated);

    return updated;
  } catch (err) {
    logger.error('CRM update error:', err);
  }
}

async function pushToAirtable(contact) {
  // Airtable integration placeholder
  // Implement with: npm install airtable
  logger.debug('Pushing to Airtable:', contact.userId);
}

async function pushToNotion(contact) {
  // Notion integration placeholder
  // Implement with: npm install @notionhq/client
  logger.debug('Pushing to Notion:', contact.userId);
}

function getContact(userId) {
  return contacts.get(userId);
}

function getAllContacts() {
  return Array.from(contacts.values());
}

module.exports = { updateCRM, getContact, getAllContacts };