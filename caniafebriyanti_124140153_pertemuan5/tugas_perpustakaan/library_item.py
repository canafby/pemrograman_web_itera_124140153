"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.

Konsep OOP yang diterapkan di modul ini:
- Abstract Class : LibraryItem(ABC) tidak bisa diinstansiasi langsung.
- Inheritance    : Book dan Magazine mewarisi LibraryItem.
- Encapsulation  : atribut protected (_item_id, _judul) dan private (__dipinjam).
- Property       : is_dipinjam (read-only) dan judul (getter + setter validasi).
- Polymorphism   : get_detail(), hitung_denda(), dan masa_pinjam_hari
                   dioverride berbeda oleh tiap subclass.
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kelas dasar abstrak untuk semua item perpustakaan."""

    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        # Protected: hanya untuk class ini dan subclass-nya
        self._item_id = item_id
        self._judul = None
        self._tahun_terbit = tahun_terbit
        # Private: status pinjam tidak boleh diubah langsung dari luar
        self.__dipinjam = False
        # Lewat setter agar judul divalidasi
        self.judul = judul

    # ------------------------------------------------------------------
    # PROPERTY
    # ------------------------------------------------------------------
    @property
    def item_id(self) -> str:
        """ID item (read-only)."""
        return self._item_id

    @property
    def judul(self) -> str:
        """Getter judul item."""
        return self._judul

    @judul.setter
    def judul(self, nilai: str):
        """Setter judul dengan validasi: tidak boleh kosong."""
        if not isinstance(nilai, str) or not nilai.strip():
            raise ValueError("Judul tidak boleh kosong!")
        self._judul = nilai.strip()

    @property
    def is_dipinjam(self) -> bool:
        """Status peminjaman (read-only, hanya diubah lewat pinjam()/kembalikan())."""
        return self.__dipinjam

    # ------------------------------------------------------------------
    # ABSTRACT METHODS (wajib diimplementasikan subclass)
    # ------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail lengkap item dalam bentuk string."""

    @abstractmethod
    def hitung_denda(self, hari_dipinjam: int) -> int:
        """Menghitung denda (Rp) berdasarkan lama hari item dipinjam."""

    @property
    @abstractmethod
    def masa_pinjam_hari(self) -> int:
        """Batas masa peminjaman (hari) untuk jenis item ini."""

    # ------------------------------------------------------------------
    # CONCRETE METHODS (dipakai bersama oleh semua subclass)
    # ------------------------------------------------------------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. False jika sudah dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sudah dikembalikan. False jika memang tidak dipinjam."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def _status_teks(self) -> str:
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    def __str__(self) -> str:
        return f"[{self._item_id}] {self._judul} ({self._tahun_terbit}) - {self._status_teks()}"


class Book(LibraryItem):
    """Buku: masa pinjam 7 hari, denda Rp 1.000 per hari keterlambatan."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun_terbit: int,
                 penulis: str, isbn: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun_terbit)
        self.penulis = penulis
        self._isbn = isbn
        self.jumlah_halaman = jumlah_halaman

    @property
    def masa_pinjam_hari(self) -> int:
        return 7

    def hitung_denda(self, hari_dipinjam: int) -> int:
        terlambat = max(0, hari_dipinjam - self.masa_pinjam_hari)
        return terlambat * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"BUKU     | {self._item_id} | {self._judul} | Penulis: {self.penulis} | "
                f"ISBN: {self._isbn} | {self.jumlah_halaman} hlm | "
                f"Tahun: {self._tahun_terbit} | Status: {self._status_teks()}")


class Magazine(LibraryItem):
    """Majalah: masa pinjam 3 hari, denda Rp 500 per hari keterlambatan."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, tahun_terbit: int,
                 penerbit: str, edisi: str):
        super().__init__(item_id, judul, tahun_terbit)
        self.penerbit = penerbit
        self.edisi = edisi

    @property
    def masa_pinjam_hari(self) -> int:
        return 3

    def hitung_denda(self, hari_dipinjam: int) -> int:
        terlambat = max(0, hari_dipinjam - self.masa_pinjam_hari)
        return terlambat * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"MAJALAH  | {self._item_id} | {self._judul} | Penerbit: {self.penerbit} | "
                f"Edisi: {self.edisi} | Tahun: {self._tahun_terbit} | "
                f"Status: {self._status_teks()}")
