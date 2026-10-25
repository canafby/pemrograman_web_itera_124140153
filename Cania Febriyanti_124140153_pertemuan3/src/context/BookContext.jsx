import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

export const STORAGE_KEY = 'manajemen-buku:books'

/** Satu sumber kebenaran untuk daftar status buku. */
export const STATUSES = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
]

export const statusLabel = (value) =>
  STATUSES.find((status) => status.value === value)?.label ?? value

// Contoh awal supaya UI tidak kosong saat pertama kali dibuka.
const EXAMPLE_BOOKS = [
  {
    id: 'contoh-1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    status: 'milik',
    createdAt: 1,
  },
  {
    id: 'contoh-2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    status: 'baca',
    createdAt: 2,
  },
  {
    id: 'contoh-3',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'beli',
    createdAt: 3,
  },
]

const BookContext = createContext(null)

/** Context API: state buku dipakai lintas halaman tanpa prop drilling. */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, EXAMPLE_BOOKS)

  const value = useMemo(
    () => ({
      books,
      addBook: (data) =>
        setBooks((prev) => [
          { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
          ...prev,
        ]),
      updateBook: (id, data) =>
        setBooks((prev) =>
          prev.map((book) => (book.id === id ? { ...book, ...data } : book)),
        ),
      deleteBook: (id) =>
        setBooks((prev) => prev.filter((book) => book.id !== id)),
    }),
    [books, setBooks],
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam BookProvider')
  }
  return context
}
