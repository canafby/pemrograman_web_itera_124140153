"""
Modul math_operations: kumpulan fungsi geometri dan konversi suhu.
"""

# Konstanta
PI = 3.14159


# ---------- Geometri: Persegi ----------
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (float): panjang sisi.

    Return:
        float: luas persegi.
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): panjang sisi.

    Return:
        float: keliling persegi.
    """
    return 4 * sisi


# ---------- Geometri: Persegi Panjang ----------
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): panjang.
        lebar (float): lebar.

    Return:
        float: luas persegi panjang.
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): panjang.
        lebar (float): lebar.

    Return:
        float: keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


# ---------- Geometri: Lingkaran ----------
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Return:
        float: luas lingkaran (PI * r^2).
    """
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Return:
        float: keliling lingkaran (2 * PI * r).
    """
    return 2 * PI * jari_jari


# ---------- Konversi Suhu ----------
def celsius_ke_fahrenheit(celsius):
    """Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius (float): suhu dalam Celsius.

    Return:
        float: suhu dalam Fahrenheit.
    """
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius (float): suhu dalam Celsius.

    Return:
        float: suhu dalam Kelvin.
    """
    return celsius + 273.15
