# Ayam Pak Gondesss

Website React/Vite untuk menampilkan menu dan menerima pesanan Ayam Pak Gondesss.

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

## Deploy ke GitHub Pages

Setelah perubahan didorong ke branch `main`, workflow GitHub Actions akan membangun dan menerbitkan website secara otomatis. Deploy manual juga dapat dijalankan dari tab **Actions** dengan workflow **Deploy to GitHub Pages**.

URL website: https://kelvin825250028-cmyk.github.io/Pak-Gondes-React-plus-ADMIN-DAN-Keranjang/

## Keranjang dan dashboard

Pilih menu dari halaman **Menu**, tambahkan ke keranjang, lalu isi detail pemesan dan buat pesanan. Pesanan langsung dicatat tanpa konfirmasi WhatsApp, lalu struk ditampilkan dan dapat dicetak. Data keranjang dan pesanan disimpan di `localStorage` browser; dashboard admin membaca pesanan dari browser yang sama, dan perubahan status disimpan di sana. Data tidak disinkronkan ke browser atau perangkat lain.

Halaman **Admin** meminta login dan menggunakan layout AdminLTE. Dashboard menampilkan tabel pesanan aktual dari keranjang dengan pencarian dan pengelolaan status. Tabel user pengunjung masih berisi data contoh, karena aplikasi belum mengumpulkan data pengunjung. Akun demo lokal:

- Email: `admin@pakgondes.local`
- Kata sandi: `GondesDemo2025!`

Login ini hanya untuk demonstrasi. Kredensial dan data berada di frontend/browser; gunakan backend dengan autentikasi dan penyimpanan server sebelum aplikasi dipublikasikan atau dipakai untuk data nyata.

## Pemeriksaan

```sh
npm run lint
npm run build
```
