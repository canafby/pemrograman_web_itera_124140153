# Mini POS — Kasir Kantin Kampus

## 1. Identitas

- **Nama Lengkap:** Cania Febriyanti
- **NIM:** 124140153
- **Program Studi:** Teknik Informatika
- **Kelas Praktikum:** PAW RB

## 2. Deskripsi Aplikasi

### Gambaran Umum

Mini POS merupakan aplikasi web sederhana untuk membantu proses transaksi kasir di kantin kampus. Aplikasi ini memungkinkan pengguna menambahkan barang, menghitung total belanja, mendapatkan diskon, melakukan pembayaran, menghitung kembalian, dan mengelola keranjang belanja.

### Tujuan Pembuatan

Aplikasi ini dibuat untuk menerapkan konsep dasar pemrograman web menggunakan HTML, CSS, dan JavaScript, termasuk validasi input, perhitungan otomatis, manipulasi DOM, dan penyimpanan data menggunakan `localStorage`.

### Studi Kasus

Sistem kasir sederhana pada kantin kampus yang menghitung subtotal barang, total belanja, diskon, total akhir, pembayaran, dan kembalian.

## 3. Panduan Menjalankan

1. Buka folder proyek di Visual Studio Code.
2. Pastikan file `index.html`, `style.css`, dan `script.js` berada dalam folder proyek.
3. Klik kanan pada file `index.html`.
4. Pilih **Open with Live Server**.
5. Tambahkan barang melalui form dan masukkan nominal pembayaran.
6. Periksa ringkasan belanja dan kembalian yang ditampilkan.

## 4. Daftar Fitur

### Validasi Form

- Validasi nama barang minimal 3 karakter.
- Validasi harga minimal Rp500.
- Validasi jumlah barang berupa bilangan bulat minimal 1.
- Menampilkan pesan error jika input tidak valid.
- Form direset setelah barang berhasil ditambahkan.

### Kalkulator Keuangan

- Menghitung subtotal dan total belanja secara otomatis.
- Memberikan diskon 10% jika subtotal minimal Rp50.000.
- Menghitung total akhir dan kembalian.
- Menampilkan peringatan jika pembayaran belum mencukupi.

### Keranjang dan Transaksi

- Menambahkan dan menghapus barang dari keranjang.
- Menampilkan daftar barang dalam bentuk tabel.
- Mengosongkan keranjang dan memulai transaksi baru.
- Menampilkan ringkasan pembayaran.

### LocalStorage

- Menyimpan data keranjang menggunakan `JSON.stringify()`.
- Memuat data keranjang menggunakan `JSON.parse()`.
- Mempertahankan data keranjang setelah halaman di-refresh.

## 5. Tangkapan Layar (Screenshot)

### Form Input Utama

Tampilan untuk memasukkan nama barang, harga, dan jumlah barang.

![Form Input Utama](image/form%20input%20utama.png)

### Validasi Error

Tampilan ketika pengguna memasukkan data yang tidak sesuai dengan ketentuan.

![Validasi Error](image/validasi%20error.png)

### Hasil Perhitungan

Tampilan keranjang belanja, total pembayaran, diskon, dan kembalian.

![Hasil Perhitungan](image/hasil%20perhitungan%20dan%20riwayat.png)

## 6. Penjelasan Teknis Singkat

### A. Validasi Input

Fungsi `validateProduct()` memeriksa nama barang, harga, dan jumlah sebelum barang ditambahkan ke keranjang.

### B. Kalkulasi Belanja

Fungsi `getTotals()` menghitung subtotal dan diskon, sedangkan `updatePayment()` memeriksa kecukupan pembayaran dan menghitung kembalian.

### C. LocalStorage

Fungsi `saveCart()` dan `loadCart()` digunakan untuk menyimpan dan memuat data keranjang agar tetap tersedia setelah halaman di-refresh.

## 7. Struktur File

```text
caniafebriyanti_124140153_pertemuan1/
├── image/
│   ├── form input utama.png
│   ├── hasil perhitungan dan riwayat.png
│   └── validasi error.png
├── index.html
├── style.css
├── script.js
└── README.md
```

## 8. Penutup

Aplikasi Mini POS merupakan penerapan HTML, CSS, dan JavaScript untuk mengelola keranjang, memvalidasi input, menghitung transaksi, dan menyimpan data menggunakan `localStorage`.