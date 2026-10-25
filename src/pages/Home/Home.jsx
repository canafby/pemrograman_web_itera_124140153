import { useEffect, useMemo, useState } from 'react'
import BookFilter from '../../components/BookFilter/BookFilter.jsx'
import BookForm from '../../components/BookForm/BookForm.jsx'
import BookList from '../../components/BookList/BookList.jsx'
import { useBooks } from '../../context/BookContext.jsx'
import './Home.css'

/** Halaman utama: form, pencarian/filter, dan daftar buku. */
export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks()
  const [editingBook, setEditingBook] = useState(null)
  const [status, setStatus] = useState('semua')
  const [query, setQuery] = useState('')

  // Pencarian judul/penulis + filter status dalam satu turunan useMemo.
  const filteredBooks = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return books.filter((book) => {
      const matchStatus = status === 'semua' || book.status === status
      const matchKeyword =
        !keyword ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
      return matchStatus && matchKeyword
    })
  }, [books, status, query])

  // Judul tab ikut jumlah koleksi → bukti useEffect bereaksi pada state.
  useEffect(() => {
    document.title = `Buku Saya (${books.length}) · Manajemen Buku`
  }, [books.length])

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data)
      setEditingBook(null)
      return
    }
    addBook(data)
  }

  const handleDelete = (book) => {
    const confirmed = window.confirm(`Hapus buku "${book.title}"?`)
    if (!confirmed) return
    deleteBook(book.id)
    if (editingBook?.id === book.id) setEditingBook(null)
  }

  const handleReset = () => {
    setQuery('')
    setStatus('semua')
  }

  return (
    <div className="home">
      <section className="home-hero">
        <h2>Koleksi buku pribadi</h2>
        <p>
          Catat buku yang sudah dimiliki, sedang dibaca, atau masuk daftar
          belanja. Semua data tersimpan otomatis di browser.
        </p>
      </section>

      <div className="home-layout">
        <BookForm
          initialBook={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => setEditingBook(null)}
        />

        <div className="home-content">
          <BookFilter
            query={query}
            status={status}
            onQueryChange={setQuery}
            onStatusChange={setStatus}
            onReset={handleReset}
            resultCount={filteredBooks.length}
          />

          <BookList
            books={filteredBooks}
            onEdit={setEditingBook}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
