"""
member.py
Berisi class Member (anggota perpustakaan).

Konsep OOP: Encapsulation (daftar pinjaman bersifat private) dan Property.
"""


class Member:
    """Anggota perpustakaan yang dapat meminjam item."""

    MAKS_PINJAMAN = 3

    def __init__(self, member_id: str, nama: str):
        self._member_id = member_id
        self.nama = nama
        # Private: hanya boleh diubah lewat method tambah/hapus
        self.__item_dipinjam = []

    @property
    def member_id(self) -> str:
        """ID anggota (read-only)."""
        return self._member_id

    @property
    def jumlah_pinjaman(self) -> int:
        """Jumlah item yang sedang dipinjam (read-only)."""
        return len(self.__item_dipinjam)

    @property
    def daftar_pinjaman(self) -> list:
        """Salinan daftar item yang dipinjam (menjaga list asli tetap aman)."""
        return list(self.__item_dipinjam)

    def bisa_meminjam(self) -> bool:
        """Cek apakah anggota masih boleh meminjam."""
        return self.jumlah_pinjaman < self.MAKS_PINJAMAN

    def tambah_pinjaman(self, item) -> None:
        """Mencatat item yang dipinjam anggota."""
        self.__item_dipinjam.append(item)

    def hapus_pinjaman(self, item) -> None:
        """Menghapus item dari catatan pinjaman anggota."""
        if item in self.__item_dipinjam:
            self.__item_dipinjam.remove(item)

    def __str__(self) -> str:
        return f"{self.nama} ({self._member_id}) - Pinjaman: {self.jumlah_pinjaman}/{self.MAKS_PINJAMAN}"
