<<<<<<< HEAD
# Mini POS — Kasir Kantin Kampus

## Identitas
- **Nama:** Cania Febriyanti
- **NIM:** 124140153
- **Program Studi:** Teknik Informatika, FTI — ITERA
- **Kelas Praktikum:** [Isi kelas praktikum]

## Deskripsi Aplikasi
Mini POS adalah aplikasi web kasir sederhana untuk membantu proses transaksi di kantin atau toko kampus. Aplikasi ini dibuat untuk menerapkan validasi input form, perhitungan otomatis, manajemen daftar belanja, dan penyimpanan data menggunakan `localStorage`.

## Teknologi
- HTML untuk struktur halaman.
- CSS untuk desain antarmuka responsif.
- JavaScript untuk validasi, perhitungan, dan interaksi.
- `localStorage` untuk menyimpan keranjang di browser.

## Panduan Menjalankan
1. Unduh atau clone repository proyek.
2. Buka folder proyek di Visual Studio Code.
3. Pastikan file `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
4. Jalankan `index.html` menggunakan ekstensi **Live Server** atau buka langsung di browser.
5. Tambahkan barang melalui form, masukkan uang bayar, lalu periksa ringkasan pembayaran.

## Daftar Fitur
- [x] Validasi nama barang minimal 3 karakter.
- [x] Validasi harga berupa angka dan minimal Rp500.
- [x] Validasi qty berupa bilangan bulat minimal 1.
- [x] Pesan kesalahan berwarna merah pada input yang tidak valid.
- [x] Form di-reset setelah barang berhasil ditambahkan.
- [x] Perhitungan subtotal per barang dan total belanja otomatis.
- [x] Diskon otomatis 10% jika subtotal minimal Rp50.000.
- [x] Perhitungan uang bayar dan kembalian otomatis.
- [x] Peringatan jika uang bayar belum mencukupi.
- [x] Tabel keranjang dan tombol hapus item.
- [x] Keranjang disimpan menggunakan `JSON.stringify()` dan dimuat menggunakan `JSON.parse()`.
- [x] Tombol kosongkan keranjang dan transaksi baru.
- [x] Tampilan responsif untuk layar desktop dan ponsel.

## Penjelasan Teknis Singkat
### 1. Validasi Form
Fungsi `validateProduct()` memeriksa nama barang, harga, dan jumlah sebelum data ditambahkan. Jika input tidak sesuai, pesan kesalahan ditampilkan dan proses penambahan dihentikan. Jika valid, data dimasukkan ke array `cart` dan form di-reset.

### 2. Kalkulasi Belanja
Fungsi `getTotals()` menggunakan `reduce()` untuk menjumlahkan subtotal semua barang. Diskon sebesar 10% diberikan jika subtotal mencapai Rp50.000. Total akhir dihitung dari subtotal dikurangi diskon. Fungsi `updatePayment()` membandingkan uang bayar dengan total akhir untuk menentukan apakah uang cukup dan menghitung kembalian.

### 3. LocalStorage
Fungsi `saveCart()` menyimpan array keranjang dengan `JSON.stringify()` ke `localStorage`. Fungsi `loadCart()` mengambil data menggunakan `localStorage.getItem()` lalu mengubahnya kembali menjadi array dengan `JSON.parse()`. Dengan demikian, keranjang tetap tersedia setelah halaman di-refresh. Tombol transaksi baru menghapus data keranjang dari `localStorage`.

## Screenshot
Tambahkan minimal tiga screenshot aplikasi sebelum pengumpulan:
1. **Tampilan form input utama:** form tambah barang dan tabel keranjang.
2. **Tampilan validasi error:** pesan kesalahan saat form dikirim dengan input tidak valid.
3. **Tampilan perhitungan:** keranjang dengan total, diskon, uang bayar, dan kembalian.

Simpan gambar screenshot di folder `screenshot/` (buat folder tersebut jika diperlukan), lalu tampilkan di bagian ini. Contoh format Markdown:

```md
![Tampilan utama](screenshot/tampilan-utama.png)
![Validasi error](screenshot/validasi-error.png)
![Perhitungan pembayaran](screenshot/perhitungan-pembayaran.png)
```

## Catatan Pengumpulan
Buat repository publik dengan nama `pemrograman_web_itera_124140153`, kemudian unggah folder proyek ini. Isi kelas praktikum yang benar dan tambahkan screenshot asli dari aplikasi sebelum mengumpulkan.
=======
# praktikum-1-paw
>>>>>>> 607faf7c2398ff1fd03e96dc8f745ab6cb09a959
