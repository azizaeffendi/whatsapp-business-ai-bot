# Deployment Guide — Production

Panduan deploy WhatsApp AI Bot ke berbagai platform production.

---

## Railway (Recommended)

Railway adalah platform yang paling mudah dengan free tier yang cukup untuk bot skala kecil-menengah.

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Init project (jalankan di direktori bot)
railway init

# 4. Tambah PostgreSQL
railway add --plugin postgresql

# 5. Tambah Redis
railway add --plugin redis

# 6. Set environment variables
railway variables set WHATSAPP_TOKEN=xxx OPENAI_API_KEY=xxx ...
# (atau upload via dashboard Railway)

# 7. Deploy
railway up
```

Railway otomatis assign domain HTTPS untuk webhook Anda.

---

## Docker (Self-Hosted)

### Dockerfile sudah disertakan. Jalankan:

```bash
# Build image
docker build -t wa-ai-bot:latest .

# Run container
docker run -d \
  --name wa-bot \
  --env-file .env \
  -p 3000:3000 \
  --restart unless-stopped \
  wa-ai-bot:latest

# Lihat logs
docker logs -f wa-bot
```

### Docker Compose (dengan PostgreSQL & Redis)
```yaml
version: '3.8'
services:
  bot:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: wabot_db
      POSTGRES_USER: botuser
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

```bash
docker-compose up -d
```

---

## VPS Ubuntu (Manual)

```bash
# 1. Update & install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm postgresql redis-server nginx certbot

# 2. Setup PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE wabot_db;"
sudo -u postgres psql -c "CREATE USER botuser WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE wabot_db TO botuser;"

# 3. Clone & setup
git clone https://github.com/azizaeffendi/whatsapp-business-ai-bot.git /var/www/wa-bot
cd /var/www/wa-bot
npm install --production
cp .env.example .env
nano .env  # Isi semua values

# 4. Setup PM2
npm install -g pm2
pm2 start src/index.js --name wa-bot --instances 2
pm2 startup
pm2 save

# 5. Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/wa-bot
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site & get SSL
sudo ln -s /etc/nginx/sites-available/wa-bot /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables Checklist

Sebelum deploy, pastikan semua ini sudah diset:

- [ ] `WHATSAPP_TOKEN`
- [ ] `WHATSAPP_PHONE_NUMBER_ID`
- [ ] `WHATSAPP_VERIFY_TOKEN`
- [ ] `OPENAI_API_KEY`
- [ ] `DATABASE_URL`
- [ ] `REDIS_URL`
- [ ] `NODE_ENV=production`
- [ ] `BASE_URL` (URL public server Anda)
- [ ] `JWT_SECRET` (random string panjang)