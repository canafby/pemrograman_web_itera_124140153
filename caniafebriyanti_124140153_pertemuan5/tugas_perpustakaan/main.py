"""
main.py
Skrip uji coba sistem manajemen perpustakaan sederhana.
Jalankan dengan: python main.py
"""

from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def cetak_hasil_cari(hasil):
    if not hasil:
        print("  -> Tidak ditemukan.")
    for item in hasil:
        print("  ->", item.get_detail())


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. MENAMBAHKAN ITEM ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", 2022, "Budi Santoso", "978-602-0001", 320))
    perpus.tambah_item(Book("B002", "Dasar Pemrograman Web", 2021, "Siti Rahma", "978-602-0002", 280))
    perpus.tambah_item(Book("B003", "Struktur Data dan Algoritma", 2020, "Ahmad Fadhil", "978-602-0003", 410))
    perpus.tambah_item(Magazine("M001", "Majalah Teknologi", 2024, "Media Informatika", "Edisi 45"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2024, "Penerbit Nusantara", "Edisi 12"))
    perpus.tambah_item(Book("B001", "Duplikat ID", 2023, "Anonim", "000", 1))  # ID kembar

    print("\n--- 2. MENAMPILKAN KATALOG ---")
    perpus.tampilkan_tersedia()

    print("\n--- 3. PENCARIAN ---")
    print("Cari ID 'M001':")
    item = perpus.cari_berdasarkan_id("M001")
    cetak_hasil_cari([item] if item else [])
    print("Cari judul 'pemrograman':")
    cetak_hasil_cari(perpus.cari_berdasarkan_judul("pemrograman"))
    print("Cari judul 'kimia':")
    cetak_hasil_cari(perpus.cari_berdasarkan_judul("kimia"))

    print("\n--- 4. PEMINJAMAN & STATUS KETERSEDIAAN ---")
    andi = Member("A001", "Andi")
    siti = Member("A002", "Siti")
    perpus.pinjam_item("B001", andi)
    perpus.pinjam_item("M001", andi)
    perpus.pinjam_item("B001", siti)   # sudah dipinjam Andi
    perpus.pinjam_item("X999", siti)   # tidak ada
    print(andi)
    perpus.tampilkan_tersedia()

    print("\n--- 5. PENGEMBALIAN & DENDA (POLIMORFISME) ---")
    perpus.kembalikan_item("B001", andi, hari_dipinjam=10)  # buku telat 3 hari
    perpus.kembalikan_item("M001", andi, hari_dipinjam=6)   # majalah telat 3 hari
    perpus.tampilkan_semua()

    print("\n--- 6. PEMBUKTIAN ENKAPSULASI & ABSTRACT CLASS ---")
    try:
        LibraryItem("X", "Abstrak", 2024)
    except TypeError as err:
        print("Abstract class tidak bisa diinstansiasi:", err)

    buku = perpus.cari_berdasarkan_id("B002")
    try:
        buku.is_dipinjam = True
    except AttributeError:
        print("is_dipinjam bersifat read-only (AttributeError).")
    try:
        buku.judul = "   "
    except ValueError as err:
        print("Validasi setter judul:", err)


if __name__ == "__main__":
    main()
