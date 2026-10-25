import { useMemo } from 'react'
import { STATUSES } from '../context/BookContext.jsx'

/** Menghitung ringkasan koleksi buku: total dan jumlah per status. */
export default function useBookStats(books) {
  return useMemo(() => {
    const perStatus = STATUSES.map((status) => ({
      ...status,
      count: books.filter((book) => book.status === status.value).length,
    }))

    return {
      total: books.length,
      perStatus,
      // Persentase untuk bar statistik, aman saat koleksi masih kosong.
      percentOf: (count) =>
        books.length === 0 ? 0 : Math.round((count / books.length) * 100),
    }
  }, [books])
}
