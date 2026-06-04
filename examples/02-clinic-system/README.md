# Example 2: Clinic Booking System

Implementasi lengkap untuk klinik kecantikan, kesehatan, atau wellness center.

## Fitur yang Diaktifkan
- Booking appointment via chat
- Reminder otomatis H-1 dan H-0
- Cek ketersediaan jadwal dokter
- Simpan data pasien di Airtable
- Kirim laporan harian ke admin

## Alur Percakapan

```
Pasien ──► "Mau booking konsultasi"
Bot     ◄── "Halo! Boleh nama lengkapnya?"
Pasien ──► "Siti Rahayu"
Bot     ◄── "Tanggal & jam yang diinginkan?"
Pasien ──► "Jumat jam 10 pagi"
Bot     ◄── "Jadwal tersedia ✅. Nomor WhatsApp konfirmasi?"
Pasien ──► "081234567890"
Bot     ◄── [Ringkasan booking + konfirmasi]
Pasien ──► "Ya, konfirmasi"
Bot     ◄── "✅ Booking dikonfirmasi! Reminder dikirim H-1"
         [Background: update Airtable, schedule reminder]
```

## Konfigurasi Tambahan

```env
# Tambahkan ke .env
AIRTABLE_API_KEY=your_airtable_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Bookings
GOOGLE_CALENDAR_ID=your_calendar_id
```

## Struktur Airtable

Buat tabel "Bookings" dengan field:
- `Name` (Single line text)
- `Phone` (Phone)
- `Service` (Single select)
- `DateTime` (Date)
- `Status` (Single select: Confirmed, Cancelled, Completed)
- `Notes` (Long text)
- `CreatedAt` (Date)

## ROI Estimasi

Klinik dengan 50 booking/bulan:
- Hemat waktu admin: ~20 jam/bulan
- Nilai waktu admin: ~Rp 2.000.000
- Biaya bot: ~Rp 150.000/bulan
- **ROI: 1.233%**