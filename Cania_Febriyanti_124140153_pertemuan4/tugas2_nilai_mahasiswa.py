BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

# List berisi 5 dictionary data mahasiswa
data_mahasiswa = [
    {"nama": "Cania Febriyanti", "nim": "124140153",
     "nilai_uts": 85, "nilai_uas": 88, "nilai_tugas": 90},
    {"nama": "Gilbert Andrew", "nim": "124140101",
     "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nama": "Elzhard Ramadan", "nim": "124140102",
     "nilai_uts": 65, "nilai_uas": 68, "nilai_tugas": 72},
    {"nama": "Caca Cantika", "nim": "124140103",
     "nilai_uts": 55, "nilai_uas": 52, "nilai_tugas": 60},
    {"nama": "Syasya Abelia", "nim": "124140104",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 48},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir berdasarkan bobot.

    Parameter:
        uts (float): nilai UTS (bobot 30%).
        uas (float): nilai UAS (bobot 40%).
        tugas (float): nilai tugas (bobot 30%).

    Return:
        float: nilai akhir.
    """
    return (BOBOT_UTS * uts) + (BOBOT_UAS * uas) + (BOBOT_TUGAS * tugas)


def tentukan_grade(nilai_akhir):
    """Menentukan grade (A-E) berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Return:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar):
    """Menambahkan kunci 'nilai_akhir' dan 'grade' ke setiap mahasiswa.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.

    Return:
        None (data dimodifikasi langsung).
    """
    for mhs in daftar:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])


def tampilkan_tabel(daftar):
    """Menampilkan data mahasiswa dalam format tabel.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.

    Return:
        None
    """
    garis = "=" * 70
    print(garis)
    print(f"{'No':<4}{'Nama':<22}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>9}")
    print("-" * 70)
    for no, mhs in enumerate(daftar, start=1):
        print(
            f"{no:<4}{mhs['nama']:<22}{mhs['nim']:<14}"
            f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>9}"
        )
    print(garis)


def cari_nilai_ekstrem(daftar):
    """Mencari mahasiswa dengan nilai akhir tertinggi dan terendah.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.

    Return:
        tuple: (mahasiswa_tertinggi, mahasiswa_terendah).
    """
    tertinggi = max(daftar, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar, key=lambda m: m["nilai_akhir"])
    return tertinggi, terendah


def main():
    proses_data(data_mahasiswa)

    print("\nDATA NILAI MAHASISWA")
    tampilkan_tabel(data_mahasiswa)

    tertinggi, terendah = cari_nilai_ekstrem(data_mahasiswa)
    print("\nNilai Akhir Tertinggi:")
    print(f"  {tertinggi['nama']} ({tertinggi['nim']}) - "
          f"{tertinggi['nilai_akhir']:.2f} (Grade {tertinggi['grade']})")
    print("Nilai Akhir Terendah:")
    print(f"  {terendah['nama']} ({terendah['nim']}) - "
          f"{terendah['nilai_akhir']:.2f} (Grade {terendah['grade']})")


if __name__ == "__main__":
    main()
