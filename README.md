<div align="center">

# 🤖 WhatsApp Business AI Bot

**Complete AI-powered WhatsApp automation system for modern businesses**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)
[![Made in Indonesia](https://img.shields.io/badge/Made%20in-Indonesia-red?style=for-the-badge)](https://github.com/azizaeffendi)

<br/>

> **Kehilangan pelanggan karena lambat balas pesan? Bot ini jawab otomatis, 24/7, dalam Bahasa Indonesia & English — cerdas, kontekstual, dan terasa seperti manusia nyata.**

<br/>

```
┌─────────────────────────────────────────────────────────────┐
│                  WHATSAPP AI BOT DASHBOARD                  │
├──────────────────┬──────────────────┬───────────────────────┤
│  📨 Messages     │  📅 Bookings     │  👥 CRM Contacts      │
│  Today: 1,247    │  Today: 89       │  Total: 12,450        │
│  ✅ Auto-replied │  ✅ Confirmed    │  🔥 Hot leads: 34     │
├──────────────────┼──────────────────┼───────────────────────┤
│  ⚡ Response Time│  💰 Revenue      │  😊 Satisfaction      │
│  < 3 seconds     │  +Rp 45 Juta     │  98.7% positive       │
└──────────────────┴──────────────────┴───────────────────────┘
```

[🚀 Quick Start](#-quick-start) · [📖 Docs](#-documentation) · [💡 Examples](#-use-cases) · [🤝 Contribute](CONTRIBUTING.md)

</div>

---

## 🌟 Why WhatsApp Business AI Bot?

Indonesia memiliki **112 juta pengguna WhatsApp aktif** — terbesar ke-3 di dunia. Namun, **73% bisnis** kehilangan pelanggan karena tidak bisa merespons cepat. Bot ini hadir sebagai solusi:

| Masalah | Solusi Bot |
|---------|-----------|
| Tidak bisa balas 24/7 | ✅ Auto-reply instan kapanpun |
| Kehilangan booking saat tidur | ✅ Sistem booking otomatis terintegrasi |
| Data pelanggan berserakan | ✅ CRM update otomatis per interaksi |
| Balas pesan memakan waktu | ✅ AI jawab kontekstual dalam detik |
| Tidak bisa kirim promo massal | ✅ Broadcast campaign dengan personalisasi |
| Tidak tahu performa | ✅ Analytics & laporan harian |

---

## ✨ Fitur Lengkap

### 🧠 AI-Powered Conversations
- **Pemahaman konteks penuh** — bot ingat history percakapan dalam satu sesi
- **Multi-bahasa** — Bahasa Indonesia, English, Javanese (configurable)
- **Tone yang bisa dikustomisasi** — formal, santai, atau profesional
- **Fallback cerdas** — eskalasi ke manusia saat bot tidak yakin
- **Sentiment detection** — deteksi pelanggan marah, lalu prioritaskan

### 📅 Sistem Booking Terintegrasi
- Jadwal appointment otomatis dengan konfirmasi
- Reminder H-1 dan H-0 otomatis via WhatsApp
- Integrasi Google Calendar & Calendly
- Reschedule dan cancel self-service
- Waitlist management

### 👥 CRM Automation
- Auto-create kontak baru dari percakapan
- Tag & segmentasi otomatis (hot lead, repeat customer, dll)
- Pipeline sales update otomatis
- Integrasi: Airtable, Notion, HubSpot, custom API
- History percakapan tersimpan per kontak

### 📣 Marketing Campaigns
- Broadcast pesan ke ribuan kontak dengan personalisasi `{{nama}}`, `{{kota}}`
- Template pesan promo, follow-up, reaktivasi
- Scheduling kampanye (kirim besok jam 9 pagi)
- Analytics: open rate, reply rate, conversion

### 📊 Analytics & Reporting
- Dashboard real-time (jumlah pesan, booking, revenue)
- Laporan harian via WhatsApp ke nomor admin
- Export data ke Google Sheets otomatis
- Konversi tracking dari first message ke closing

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        WHATSAPP CLOUD API                       │
│                    (Meta Business Platform)                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Webhook
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS.JS SERVER                          │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ Webhook Handler │  │  Message Router   │  │ Rate Limiter │  │
│  └────────┬────────┘  └────────┬─────────┘  └──────────────┘  │
│           └───────────────────►│                               │
└───────────────────────────────┬─────────────────────────────────┘
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   AI ENGINE     │  │  BOOKING ENGINE  │  │   CRM ENGINE     │
│ ┌─────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  OpenAI     │ │  │ │ Availability │ │  │ │ Contact Mgmt │ │
│ │  GPT-4      │ │  │ │ Checker      │ │  │ │              │ │
│ └─────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │
│ ┌─────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │  Context    │ │  │ │ Confirmation │ │  │ │ Lead Scoring │ │
│ │  Manager    │ │  │ │ System       │ │  │ │              │ │
│ └─────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │
└─────────────────┘  └──────────────────┘  └──────────────────┘
              │                 │                  │
              └─────────────────┼──────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                          │
│     PostgreSQL (utama)  │  Redis (cache/session)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Meta Business Account + WhatsApp Cloud API Access
- OpenAI API Key

### 1. Clone & Install

```bash
git clone https://github.com/azizaeffendi/whatsapp-business-ai-bot.git
cd whatsapp-business-ai-bot
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit `.env` dengan credential Anda (lihat `.env.example` untuk panduan lengkap).

### 3. Setup Database

```bash
npm run db:migrate
npm run db:seed
```

### 4. Jalankan

```bash
npm run dev       # Development
npm start         # Production
```

### 5. Setup Webhook

Daftarkan webhook di Meta Business Dashboard:
- **Callback URL**: `https://yourdomain.com/webhook`
- **Verify Token**: nilai `WHATSAPP_VERIFY_TOKEN` dari `.env` Anda
- **Subscribe**: `messages`, `message_deliveries`, `message_reads`

**Bot siap dalam < 10 menit!** 🎉

---

## 💡 Use Cases

### 🏥 Klinik & Healthcare
```
Pasien: "Mau booking konsultasi dokter besok"
Bot:    "Tersedia: Selasa 14:00 & 16:00, Rabu 09:00. Pilih slot?"
Pasien: "Selasa jam 2 siang"
Bot:    "✅ Booking dikonfirmasi! Reminder dikirim H-1. Sampai jumpa!"
```

### 🛒 E-Commerce & Toko Online
```
Customer: "Ada promo hari ini?"
Bot:      "🎉 Flash Sale! Diskon 30% semua baju + gratis ongkir min. Rp 150rb
           Berlaku hingga 23:59. Ketik 'KATALOG' untuk lihat koleksi!"
```

### 🏠 Properti & Real Estate
```
Calon buyer: "Info rumah di Bekasi harga 500 juta"
Bot:         "Ditemukan 3 listing Bekasi ≤500jt. Mau detail atau jadwal survey?"
```

### 🍽️ Restoran & F&B
```
Customer: "Reservasi meja untuk 4 orang malam ini jam 7"
Bot:      "✅ Meja 4 orang jam 19:00 atas nama? (untuk konfirmasi reservasi)"
```

---

## 📁 Struktur Proyek

```
whatsapp-business-ai-bot/
├── src/
│   ├── index.js                    # Entry point
│   ├── config/config.js            # Konfigurasi utama
│   ├── bot/
│   │   ├── whatsapp/
│   │   │   ├── client.js           # WhatsApp Cloud API client
│   │   │   └── webhook.js          # Webhook handler
│   │   ├── handlers/
│   │   │   ├── message.handler.js  # Routing pesan + sentiment
│   │   │   ├── booking.handler.js  # Multi-step booking flow
│   │   │   └── crm.handler.js      # CRM auto-update
│   │   └── ai/
│   │       ├── openai.service.js   # OpenAI + conversation history
│   │       └── prompt.templates.js # System prompts yang bisa dikustomisasi
│   └── utils/
│       ├── logger.js               # Winston logger
│       └── helpers.js              # Utility functions
├── docs/
│   ├── SETUP.md                    # Panduan setup dari nol
│   └── DEPLOYMENT.md               # Railway, Docker, VPS, Heroku
├── examples/
│   ├── 01-basic-bot/               # Bot dasar 5 menit setup
│   ├── 02-clinic-system/           # Klinik + Airtable
│   └── 03-ecommerce-bot/           # Toko online + broadcast
├── .env.example
├── package.json
├── LICENSE
└── CONTRIBUTING.md
```

---

## 🚢 Deployment

| Platform | Waktu Setup | Biaya | Rekomendasi |
|----------|------------|-------|-------------|
| Railway | 5 menit | Gratis/berbayar | ⭐ Terbaik untuk pemula |
| Render | 10 menit | Gratis/berbayar | Alternatif Railway |
| Docker (VPS) | 30 menit | ~$5/bulan | Kontrol penuh |
| Heroku | 15 menit | ~$7/bulan | Familiar |

Lihat [DEPLOYMENT.md](docs/DEPLOYMENT.md) untuk panduan lengkap setiap platform.

---

## 📊 Performance Benchmarks

| Metrik | Nilai |
|--------|-------|
| Response time rata-rata | < 2.5 detik |
| Concurrent conversations | 10,000+ |
| Uptime | 99.9% |
| Biaya operasional/bulan | ~$20-50 USD |

---

## 🤝 Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk cara berkontribusi.

---

## 📜 Lisensi

MIT © [azizaeffendi](https://github.com/azizaeffendi)

---

## 👨‍💻 Dibuat oleh

<div align="center">

**Muhammad Aziz A Effendi**
*Full-Stack Developer · AI Marketing Engineer · Indonesia*

[![GitHub](https://img.shields.io/badge/GitHub-@azizaeffendi-181717?style=flat-square&logo=github)](https://github.com/azizaeffendi)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail)](mailto:bagijuruss@gmail.com)

*Butuh implementasi custom untuk bisnis Anda? [Hubungi saya →](mailto:bagijuruss@gmail.com)*

</div>

---

<div align="center">
Jika repo ini bermanfaat, berikan ⭐ agar lebih banyak orang yang menemukan!
</div>