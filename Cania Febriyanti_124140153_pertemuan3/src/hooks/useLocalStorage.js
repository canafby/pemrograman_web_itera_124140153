import { useEffect, useState } from 'react'

/**
 * Membaca nilai awal dari localStorage. Dibungkus try/catch supaya data
 * rusak (JSON tidak valid) tidak membuat aplikasi crash saat pertama dibuka.
 */
function readValue(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

/** Menyimpan state ke localStorage setiap kali nilainya berubah. */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Kuota penuh / mode privat: data tetap jalan di memori saja.
    }
  }, [key, value])

  return [value, setValue]
}
