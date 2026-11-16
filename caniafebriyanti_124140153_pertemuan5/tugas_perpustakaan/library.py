"""
library.py
Berisi class Library yang mengelola koleksi item perpustakaan.

Konsep OOP: Encapsulation (koleksi private) dan Polymorphism
(memanggil get_detail()/hitung_denda() tanpa peduli tipe item).
"""

from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola koleksi LibraryItem."""

    def __init__(self, nama: str):
        self.nama = nama
        # Private: koleksi hanya diakses lewat method class ini
        self.__koleksi = {}  # {item_id: LibraryItem}

    # ------------------------------------------------------------------
    # Fitur utama
    # ------------------------------------------------------------------
    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke perpustakaan. False jika ID sudah ada."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan dari LibraryItem!")
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID '{item.item_id}' sudah terdaftar.")
            return False
        self.__koleksi[item.item_id] = item
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_tersedia(self) -> None:
        """Menampilkan daftar item yang tersedia (belum dipinjam)."""
        tersedia = [i for i in self.__koleksi.values() if not i.is_dipinjam]
        print(f"\n=== KATALOG TERSEDIA - {self.nama} ({len(tersedia)} item) ===")
        if not tersedia:
            print("(tidak ada item tersedia)")
        for item in tersedia:
            print(item.get_detail())  # polimorfisme

    def tampilkan_semua(self) -> None:
        """Menampilkan seluruh item beserta statusnya."""
        print(f"\n=== SELURUH KOLEKSI - {self.nama} ({len(self.__koleksi)} item) ===")
        for item in self.__koleksi.values():
            print(item.get_detail())

    def cari_berdasarkan_id(self, item_id: str):
        """Mencari item berdasarkan ID. Mengembalikan item atau None."""
        return self.__koleksi.get(item_id)

    def cari_berdasarkan_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya mengandung kata kunci (tidak case-sensitive)."""
        kata = kata_kunci.lower()
        return [i for i in self.__koleksi.values() if kata in i.judul.lower()]

    # ------------------------------------------------------------------
    # Peminjaman
    # ------------------------------------------------------------------
    def pinjam_item(self, item_id: str, member: Member) -> bool:
        """Meminjamkan item kepada anggota."""
        item = self.cari_berdasarkan_id(item_id)
        if item is None:
            print(f"Gagal: item '{item_id}' tidak ditemukan.")
            return False
        if not member.bisa_meminjam():
            print(f"Gagal: {member.nama} sudah mencapai batas {Member.MAKS_PINJAMAN} pinjaman.")
            return False
        if not item.pinjam():
            print(f"Gagal: '{item.judul}' sedang dipinjam.")
            return False
        member.tambah_pinjaman(item)
        print(f"{member.nama} berhasil meminjam '{item.judul}' "
              f"(maks. {item.masa_pinjam_hari} hari).")
        return True

    def kembalikan_item(self, item_id: str, member: Member, hari_dipinjam: int) -> bool:
        """Memproses pengembalian dan menghitung denda."""
        item = self.cari_berdasarkan_id(item_id)
        if item is None or item not in member.daftar_pinjaman:
            print(f"Gagal: {member.nama} tidak meminjam item '{item_id}'.")
            return False
        item.kembalikan()
        member.hapus_pinjaman(item)
        denda = item.hitung_denda(hari_dipinjam)  # polimorfisme
        print(f"{member.nama} mengembalikan '{item.judul}' setelah {hari_dipinjam} hari. "
              f"Denda: Rp {denda:,}".replace(",", "."))
        return True

    @property
    def jumlah_item(self) -> int:
        """Total item di perpustakaan."""
        return len(self.__koleksi)
