# 🌷 StudyBloom — Student Productivity Dashboard

StudyBloom adalah dashboard produktivitas sederhana yang dibuat untuk membantu mahasiswa mengatur tugas kuliah dengan lebih mudah. Melalui aplikasi ini, pengguna bisa mencatat tugas, mengatur tenggat waktu, melihat progres pengerjaan, dan memantau tugas yang sudah selesai maupun yang masih perlu dikerjakan.

## Fitur Aplikasi

Berikut beberapa fitur yang tersedia di StudyBloom:

- **Tambah tugas:** Menambahkan tugas kuliah baru ke dalam daftar.
- **Edit tugas:** Mengubah informasi tugas yang sudah ditambahkan.
- **Hapus tugas:** Menghapus tugas yang sudah tidak diperlukan.
- **Tandai selesai:** Menandai tugas yang sudah selesai dikerjakan.
- **Penyimpanan otomatis:** Menyimpan daftar tugas menggunakan `localStorage`, sehingga data tetap tersedia saat halaman dibuka kembali melalui browser yang sama.
- **Pencarian tugas:** Memudahkan pengguna menemukan tugas berdasarkan kata kunci.
- **Filter tugas:** Menampilkan tugas berdasarkan status pengerjaannya.
- **Statistik tugas:** Menampilkan ringkasan jumlah tugas dan progres penyelesaiannya.
- **Kutipan motivasi:** Mengambil kutipan motivasi dari API menggunakan `fetch()` dan `async/await`.
- **Desain responsif:** Menyesuaikan tampilan dengan ukuran layar perangkat yang digunakan.

## Screenshot Aplikasi

Berikut adalah tampilan dashboard utama StudyBloom.

![Screenshot Dashboard StudyBloom](./image/dashboard.png)

## Fitur JavaScript ES6+ yang Digunakan

Dalam pengembangan StudyBloom, terdapat beberapa fitur JavaScript ES6+ yang digunakan untuk mengelola data dan membuat aplikasi lebih interaktif.

| Fitur | Kegunaan | Referensi Baris `script.js` |
|---|---|---|
| `let` dan `const` | Mendeklarasikan variabel dan nilai yang digunakan dalam aplikasi. | Sekitar baris 5–6 dan 238 |
| Arrow function | Menulis fungsi dengan sintaks yang lebih ringkas, termasuk untuk callback event. | Sekitar baris 46, 58–75, 102, 130–132, 145–149, 156, 166–173, 183, 198, dan 260 |
| Template literals | Membuat string HTML dengan menyisipkan nilai variabel. | Sekitar baris 207–220 |
| Destructuring | Mengambil nilai dari objek atau hasil pemrosesan data. | Sekitar baris 9, 81, 105, 126, 166, 183, 204, dan 239 |
| Spread syntax (`...`) | Menyalin atau menggabungkan data array dan objek. | Sekitar baris 131, 136, dan 156 |
| Array methods | Mengolah daftar tugas menggunakan metode seperti `map()`, `filter()`, dan `find()`. | Sekitar baris 46, 102, 130, 145, 149, 156, 166–173, 183, dan 198 |
| Classes | Mengelompokkan data dan fungsi aplikasi menggunakan class `TaskItem` dan `DashboardApp`. | Sekitar baris 8–20 |
| `async/await` | Menangani proses asynchronous saat mengambil kutipan motivasi dari API. | Sekitar baris 229–249 |
| `fetch()` | Mengirim permintaan untuk mengambil data kutipan dari API. | Sekitar baris 236–237 |
| `localStorage` | Menyimpan dan membaca kembali daftar tugas melalui browser. | Sekitar baris 45 dan 54 |
| `Object.fromEntries()` | Mengubah kumpulan pasangan nilai menjadi sebuah objek. | Sekitar baris 126 |

## Penyimpanan Data

StudyBloom menggunakan `localStorage` untuk menyimpan daftar tugas secara lokal di browser. Dengan begitu, tugas yang sudah ditambahkan tidak langsung hilang ketika halaman ditutup atau dibuka kembali.

Data tugas disimpan menggunakan key berikut:

```text
studyBloomTasks
```

Karena penyimpanannya dilakukan secara lokal, data hanya tersedia pada browser dan perangkat tempat data tersebut disimpan. Data tidak otomatis tersinkronisasi dengan perangkat atau browser lain.

## Teknologi yang Digunakan

Beberapa teknologi yang digunakan dalam pengembangan StudyBloom adalah:

- **HTML:** Menyusun struktur dan elemen halaman aplikasi.
- **CSS:** Mengatur tampilan, warna, tata letak, dan desain responsif.
- **JavaScript (ES6+):** Menangani interaksi pengguna, pengelolaan tugas, dan pengolahan data.
- **localStorage:** Menyimpan data tugas secara lokal di browser.
- **Fetch API:** Mengambil kutipan motivasi dari layanan API.

## Penutup

StudyBloom dibuat sebagai aplikasi sederhana untuk membantu mahasiswa mengelola tugas kuliah dan memantau progres belajar dalam satu dashboard. Melalui proyek ini, berbagai konsep HTML, CSS, dan JavaScript ES6+ diterapkan dalam bentuk aplikasi yang dapat digunakan secara langsung.

Harapannya, StudyBloom dapat menjadi langkah kecil untuk membangun kebiasaan belajar yang lebih teratur dan membantu mahasiswa menjalani aktivitas perkuliahan dengan lebih terorganisir.