# Example 3: E-Commerce Assistant Bot

Bot untuk toko online — product search, order status, customer support, dan promo broadcast.

## Fitur
- Cari produk via chat ("ada baju warna merah ukuran M?")
- Cek status pesanan via nomor order
- Balas FAQ otomatis (pengiriman, retur, pembayaran)
- Broadcast promo ke segmen pelanggan
- Upsell & cross-sell otomatis berdasarkan histori

## Integrasi yang Dibutuhkan
- WooCommerce / Shopify API untuk data produk & order
- Payment gateway untuk link pembayaran
- Spreadsheet / database untuk katalog produk

## Contoh Template Pesan Promo

```javascript
// Broadcast flash sale ke semua pelanggan aktif
const customers = await getActiveCustomers();

for (const customer of customers) {
  const personalizedMsg = `Halo ${customer.name}! 🎉
  
Flash Sale 12.12 khusus untuk kamu!
Diskon 30% untuk semua produk favorit kamu.

Lihat sekarang: [link_toko]
Kode promo: FLASHSALE30
Berlaku hingga tengah malam!`;

  await sendWhatsApp(customer.phone, personalizedMsg);
  await sleep(500); // Hindari rate limiting
}
```

## Tips Penting
- Jangan broadcast lebih dari 1000 pesan/jam untuk menghindari ban
- Selalu berikan opsi unsubscribe
- Personalisasi minimal dengan nama pelanggan
- Kirim di jam optimal: 09:00-11:00 atau 19:00-21:00 WIB