import PropTypes from 'prop-types'
import { STATUSES, statusLabel } from '../../context/BookContext.jsx'
import './BookList.css'

/** Satu kartu buku. Dipisah dari BookList agar mudah dites dan dipakai ulang. */
function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className={`book-card status-${book.status}`}>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>

      <div className="book-actions">
        <span className={`badge badge-${book.status}`}>
          {statusLabel(book.status)}
        </span>
        <button type="button" className="btn btn-ghost" onClick={() => onEdit(book)}>
          Ubah
        </button>
        <button
          type="button"
          className="btn btn-danger-ghost"
          onClick={() => onDelete(book)}
        >
          Hapus
        </button>
      </div>
    </li>
  )
}

/** Daftar buku yang sudah difilter oleh halaman induk. */
export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="empty">
        Belum ada buku yang cocok. Coba ubah filter atau tambah buku baru.
      </p>
    )
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(STATUSES.map((status) => status.value)).isRequired,
})

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
