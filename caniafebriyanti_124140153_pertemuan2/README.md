# 🌷 StudyBloom — Student Productivity Dashboard

> Tugas Praktikum PAW ITERA — Pertemuan 2: JavaScript Next Gen (ES6+), bagian Personal Dashboard.

StudyBloom adalah aplikasi planner mahasiswa bertema pink pastel untuk membantu mencatat tugas kuliah, mengatur deadline, menentukan prioritas, dan memantau progres belajar.

## Fitur aplikasi

- **Tambah, edit, dan hapus tugas** melalui form interaktif.
- **Tandai tugas selesai** dengan checkbox.
- **Penyimpanan lokal** menggunakan `localStorage`, sehingga data tetap ada setelah halaman di-refresh pada browser yang sama.
- **Pencarian tugas** berdasarkan nama tugas atau mata kuliah.
- **Filter tugas** berdasarkan status dan prioritas.
- **Ringkasan progres** berupa jumlah semua tugas, tugas aktif, dan tugas selesai.
- **Kutipan motivasi** dari DummyJSON Quotes API dengan kutipan cadangan jika API tidak tersedia.
- **Tampilan responsif** untuk desktop dan layar ponsel.

## Struktur pengumpulan

Simpan proyek ini di dalam folder pertemuan bernama `[NAMA]_[NIM]_pertemuan2` pada repository `pemrograman_web_itera_[NIM]`. Ganti placeholder dengan nama dan NIM kamu sendiri, sesuai format modul.

```text
pemrograman_web_itera_[NIM]/
└── [NAMA]_[NIM]_pertemuan2/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    └── assets/
        ├── README.txt
        └── screenshot.png
```

## Cara menjalankan

1. Ekstrak ZIP proyek ini.
2. Buka folder proyek di VS Code.
3. Jalankan `index.html` menggunakan ekstensi **Live Server** (disarankan), atau buka file HTML langsung di browser.
4. Pastikan internet tersedia untuk Google Fonts dan kutipan motivasi. Fitur pengelolaan tugas dan `localStorage` tetap bisa digunakan tanpa API.

## Screenshot aplikasi

**Tambahkan screenshot sebelum mengumpulkan tugas.** Jalankan aplikasi di browser, ambil screenshot tampilan aplikasi, lalu simpan sebagai `assets/screenshot.png`. Gambar akan tampil di bawah ini setelah file tersebut ditambahkan.

![Screenshot StudyBloom](assets/screenshot.png)

## Implementasi ES6+ (file `script.js`)

Nomor baris berikut mengacu pada versi `script.js` yang disertakan dalam proyek ini. Jika kamu mengubah kode, nomor baris bisa berubah.

| Fitur | Implementasi | Baris |
|---|---|---:|
| `const` | Konstanta untuk key `localStorage` dan endpoint API | 5–6 |
| `let` | Variabel lokal untuk menyimpan hasil respons JSON | 238 |
| Class | `TaskItem` dan `DashboardApp` | 8, 20 |
| Constructor dan destructuring parameter | Constructor `TaskItem` menerima objek tugas | 9 |
| Arrow functions | Callback event, callback array, dan fungsi inisialisasi | 46, 58–75, 102, 130–132, 145–149, 156, 166–173, 183, 198, 260 |
| Template literals | Membuat HTML tugas secara dinamis | 207–220 |
| `async/await` | Mengambil kutipan motivasi secara asynchronous | 229–249 |
| `fetch()` dan Promise | Request ke DummyJSON Quotes API | 236–237 |
| Spread operator | Membuat objek tugas baru dan array baru saat memperbarui data | 131, 136, 156 |
| Array methods | `map`, `filter`, `find`, dan `sort` | 46, 102, 130, 145, 149, 156, 166–173, 183, 198 |
| `localStorage` | Membaca dan menyimpan tugas | 45, 54 |
| Destructuring | Parameter constructor, data form, dan respons API | 9, 81, 105, 126, 166, 183, 204, 239 |
| `Object.fromEntries()` | Mengubah entri form menjadi objek | 126 |

### Catatan penggunaan `let` dan `const`

`const` digunakan untuk referensi yang tidak perlu ditugaskan ulang, sedangkan `let` digunakan untuk `quoteData` pada baris 238. Keduanya dipakai sesuai kebutuhan variabel.

## Penyimpanan data

Data tugas disimpan di browser dengan key `studyBloomTasks`. Data tidak otomatis tersinkron ke perangkat atau browser lain. Menghapus data situs/browser juga dapat menghapus tugas yang tersimpan.
