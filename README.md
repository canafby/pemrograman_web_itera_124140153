# Mini POS — Kasir Kantin Kampus

## 1. Identitas

- **Nama:** Cania Febriyanti
- **NIM:** 124140153
- **Program Studi:** Teknik Informatika
- **Kelas Praktikum:** PAW RB

## 2. Gambaran Umum

Mini POS merupakan aplikasi web kasir sederhana yang digunakan untuk membantu proses transaksi di kantin kampus. Aplikasi ini memungkinkan pengguna menambahkan barang ke keranjang, menghitung total belanja, mendapatkan diskon, memasukkan nominal pembayaran, serta menghitung kembalian secara otomatis.

Aplikasi ini dibuat sebagai penerapan konsep dasar pemrograman web menggunakan HTML, CSS, dan JavaScript.

## 3. Tujuan Pembuatan

Aplikasi Mini POS bertujuan untuk menerapkan validasi input form, perhitungan otomatis, manipulasi DOM, pengelolaan daftar belanja, serta penyimpanan data menggunakan `localStorage`.

## 4. Studi Kasus

Studi kasus yang digunakan adalah sistem kasir sederhana pada kantin kampus. Pengguna dapat memasukkan nama barang, harga, dan jumlah barang. Sistem akan menghitung subtotal setiap barang, total belanja, diskon, total akhir, pembayaran, dan kembalian.

## 5. Teknologi yang Digunakan

- **HTML** untuk membuat struktur halaman aplikasi.
- **CSS** untuk mengatur desain antarmuka dan tampilan responsif.
- **JavaScript** untuk menangani validasi input, perhitungan transaksi, dan interaksi pengguna.
- **LocalStorage** untuk menyimpan data keranjang di browser.

## 6. Panduan Menjalankan

Langkah-langkah untuk menjalankan aplikasi secara lokal:

1. Unduh atau clone repository proyek.
2. Buka folder proyek di Visual Studio Code.
3. Pastikan file `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
4. Jalankan file `index.html` menggunakan ekstensi **Live Server** atau buka langsung melalui browser.
5. Masukkan nama barang, harga, dan jumlah barang melalui form.
6. Tambahkan barang ke keranjang dan masukkan nominal pembayaran.
7. Periksa ringkasan belanja, diskon, status pembayaran, dan kembalian yang ditampilkan.

## 7. Daftar Fitur

### 7.1 Validasi Form

- [x] Validasi nama barang minimal 3 karakter.
- [x] Validasi harga berupa angka dan minimal Rp500.
- [x] Validasi jumlah barang berupa bilangan bulat minimal 1.
- [x] Menampilkan pesan kesalahan berwarna merah jika input tidak valid.
- [x] Form direset setelah barang berhasil ditambahkan.

### 7.2 Kalkulator Keuangan

- [x] Menghitung subtotal setiap barang secara otomatis.
- [x] Menghitung total belanja secara otomatis.
- [x] Memberikan diskon 10% jika subtotal minimal Rp50.000.
- [x] Menghitung total akhir setelah diskon.
- [x] Menghitung uang bayar dan kembalian secara otomatis.
- [x] Menampilkan peringatan jika uang pembayaran belum mencukupi.

### 7.3 Keranjang dan Transaksi

- [x] Menambahkan barang ke keranjang.
- [x] Menampilkan daftar barang dalam bentuk tabel.
- [x] Menghapus barang dari keranjang.
- [x] Mengosongkan keranjang.
- [x] Memulai transaksi baru.
- [x] Menampilkan ringkasan pembayaran.

### 7.4 Penyimpanan Data

- [x] Menyimpan data keranjang menggunakan `localStorage`.
- [x] Mengubah data keranjang menjadi format JSON menggunakan `JSON.stringify()`.
- [x] Memuat data keranjang menggunakan `localStorage.getItem()` dan `JSON.parse()`.
- [x] Mempertahankan data keranjang setelah halaman di-refresh.

### 7.5 Antarmuka

- [x] Tampilan responsif untuk layar desktop dan ponsel.
- [x] Tombol dan form untuk memudahkan proses transaksi.

## 8. Penjelasan Teknis

### 8.1 Validasi Form

Fungsi `validateProduct()` digunakan untuk memeriksa nama barang, harga, dan jumlah sebelum data ditambahkan ke keranjang. Jika input tidak sesuai, sistem menampilkan pesan kesalahan dan menghentikan proses penambahan barang. Jika input valid, data dimasukkan ke dalam array `cart` dan form direset.

### 8.2 Kalkulasi Belanja

Fungsi `getTotals()` menggunakan metode `reduce()` untuk menjumlahkan subtotal seluruh barang dalam keranjang. Sistem memberikan diskon sebesar 10% jika subtotal mencapai Rp50.000. Total akhir dihitung dari subtotal dikurangi diskon.

Fungsi `updatePayment()` digunakan untuk membandingkan nominal pembayaran dengan total akhir. Jika pembayaran mencukupi, sistem menghitung kembalian. Jika pembayaran kurang, sistem menampilkan peringatan kepada pengguna.

### 8.3 LocalStorage

Fungsi `saveCart()` menyimpan data keranjang menggunakan `JSON.stringify()` ke dalam `localStorage`. Fungsi `loadCart()` mengambil data menggunakan `localStorage.getItem()` dan mengubahnya kembali menjadi array menggunakan `JSON.parse()`.

Dengan mekanisme tersebut, data keranjang tetap tersedia ketika halaman di-refresh. Data keranjang juga dapat dihapus melalui fitur kosongkan keranjang atau transaksi baru.

## 9. Struktur File

```text
caniafebriyanti_124140153_pertemuan1/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 10. Penutup

Aplikasi Mini POS merupakan penerapan konsep dasar pemrograman web yang menggabungkan HTML, CSS, dan JavaScript. Melalui aplikasi ini, pengguna dapat mempelajari validasi form, manipulasi DOM, perhitungan transaksi, pengelolaan keranjang, serta penyimpanan data menggunakan `localStorage`.
