"""
Program utama untuk menguji modul math_operations.
"""

# Cara impor 1: mengimpor seluruh modul (diakses dengan awalan nama modul)
import math_operations

# Cara impor 2: mengimpor fungsi/konstanta tertentu secara langsung
from math_operations import (
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
    PI,
)


def tampilkan_judul(judul):
    """Mencetak judul bagian dengan garis pembatas.

    Parameter:
        judul (str): teks judul.

    Return:
        None
    """
    print("\n" + "=" * 50)
    print(f"  {judul}")
    print("=" * 50)


def main():
    print(f"Nilai konstanta PI = {PI}")

    # --- Persegi (cara impor 1) ---
    tampilkan_judul("PERSEGI")
    for sisi in (4, 7.5):
        print(f"Sisi {sisi:<5} -> Luas: {math_operations.luas_persegi(sisi):>8.2f}"
              f" | Keliling: {math_operations.keliling_persegi(sisi):>8.2f}")

    # --- Persegi Panjang (cara impor 1) ---
    tampilkan_judul("PERSEGI PANJANG")
    for p, l in ((5, 3), (10, 6.5)):
        print(f"P={p:<4} L={l:<4} -> "
              f"Luas: {math_operations.luas_persegi_panjang(p, l):>8.2f}"
              f" | Keliling: {math_operations.keliling_persegi_panjang(p, l):>8.2f}")

    # --- Lingkaran (cara impor 2) ---
    tampilkan_judul("LINGKARAN")
    for r in (7, 10.5):
        print(f"r = {r:<5} -> Luas: {luas_lingkaran(r):>8.2f}"
              f" | Keliling: {keliling_lingkaran(r):>8.2f}")

    # --- Konversi Suhu (cara impor 2) ---
    tampilkan_judul("KONVERSI SUHU")
    for c in (0, 25, 100):
        print(f"{c:>4} C -> {celsius_ke_fahrenheit(c):>7.2f} F"
              f" | {celsius_ke_kelvin(c):>7.2f} K")


if __name__ == "__main__":
    main()
