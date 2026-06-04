# Example 1: Basic Auto-Reply Bot

Bot paling sederhana — hanya auto-reply pesan dengan AI. Cocok untuk pemula.

## Yang Dipelajari
- Setup webhook dasar
- Integrasi OpenAI untuk reply otomatis
- Handle teks message

## Setup (5 Menit)

1. Copy `.env.example` ke `.env`, isi `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `OPENAI_API_KEY`
2. Jalankan: `npm run dev`
3. Expose dengan ngrok: `ngrok http 3000`
4. Daftarkan webhook di Meta Console

## Kode Inti

```javascript
// Minimal handler — hanya AI reply
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message || message.type !== 'text') return;

  const reply = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Kamu adalah asisten bisnis yang ramah.' },
      { role: 'user', content: message.text.body }
    ]
  });

  await sendWhatsApp(message.from, reply.choices[0].message.content);
});
```

## Estimasi Biaya

| Komponen | Estimasi/bulan |
|----------|----------------|
| Server (Railway free) | Gratis |
| OpenAI (1000 pesan) | ~$2-5 |
| WhatsApp API | Gratis s.d 1000 konversasi/bulan |
| **Total** | **~$2-5/bulan** |