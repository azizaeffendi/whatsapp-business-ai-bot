# Setup Guide — WhatsApp Business AI Bot

Panduan lengkap dari nol sampai bot Anda berjalan.

---

## Prasyarat

### 1. Meta Business Account
1. Buka [business.facebook.com](https://business.facebook.com)
2. Buat atau gunakan Business Account yang sudah ada
3. Verifikasi bisnis Anda (diperlukan untuk volume tinggi)

### 2. WhatsApp Business API Access
1. Di Meta Business Suite, buka **WhatsApp > Getting Started**
2. Buat aplikasi baru (tipe: Business)
3. Tambahkan produk **WhatsApp**
4. Catat:
   - `Phone Number ID`
   - `WhatsApp Business Account ID`
   - `Access Token` (generate permanent token)

### 3. OpenAI API Key
1. Buka [platform.openai.com](https://platform.openai.com)
2. Pergi ke **API Keys > Create new secret key**
3. Salin dan simpan key Anda (hanya ditampilkan sekali)

### 4. Server/Hosting
Bot memerlukan server publik dengan HTTPS untuk menerima webhook Meta.
Pilihan hosting:
- **Railway** (recommended, ada free tier)
- **Render** (free tier tersedia)
- **Heroku** (berbayar)
- **VPS** (Digital Ocean, Vultr, dll)

---

## Langkah 1: Install & Konfigurasi

```bash
# Clone repository
git clone https://github.com/azizaeffendi/whatsapp-business-ai-bot.git
cd whatsapp-business-ai-bot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
```

Buka `.env` dengan text editor dan isi semua nilai yang diperlukan.

---

## Langkah 2: Setup Database

### PostgreSQL
```bash
# Buat database
createdb wabot_db

# Jalankan migrasi
npm run db:migrate

# (Opsional) Isi data awal
npm run db:seed
```

### Redis
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# macOS
brew install redis
brew services start redis

# Verifikasi
redis-cli ping  # Harus respond: PONG
```

---

## Langkah 3: Test Lokal

```bash
# Jalankan bot dalam mode development
npm run dev
```

Untuk expose localhost ke internet (testing webhook):
```bash
# Install ngrok
npm install -g ngrok

# Expose port 3000
ngrok http 3000
# Catat HTTPS URL yang diberikan, contoh: https://abc123.ngrok.io
```

---

## Langkah 4: Daftarkan Webhook di Meta

1. Di Meta Developer Console, buka aplikasi Anda
2. Pilih **WhatsApp > Configuration**
3. Klik **Edit** di bagian Webhook
4. Isi:
   - **Callback URL**: `https://your-domain.com/webhook` (atau ngrok URL)
   - **Verify Token**: nilai `WHATSAPP_VERIFY_TOKEN` dari `.env` Anda
5. Klik **Verify and Save**
6. Di bawah **Webhook fields**, subscribe ke: `messages`

---

## Langkah 5: Test Bot

Kirim pesan WhatsApp ke nomor test Anda. Anda seharusnya mendapat balasan otomatis!

Jika tidak berhasil, cek:
```bash
# Lihat logs
npm run dev  # Error akan muncul di console
```

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Webhook verification gagal | Pastikan `WHATSAPP_VERIFY_TOKEN` di `.env` sama dengan yang di Meta Console |
| Bot tidak balas | Cek apakah server running dan webhook subscription aktif |
| Error OpenAI | Verifikasi `OPENAI_API_KEY` valid dan ada kredit |
| Database error | Pastikan PostgreSQL running dan `DATABASE_URL` benar |
| Bot balas tapi tidak kontekstual | Cek system prompt di `src/bot/ai/prompt.templates.js` |

---

Butuh bantuan lebih? [Buka Issue](https://github.com/azizaeffendi/whatsapp-business-ai-bot/issues) atau hubungi [Aziz Aeffendi](mailto:bagijuruss@gmail.com)