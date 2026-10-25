import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { STATUSES } from '../../context/BookContext.jsx'
import './BookForm.css'

const EMPTY_FORM = { title: '', author: '', status: 'milik' }

function validate({ title, author }) {
  const errors = {}
  if (!title.trim()) errors.title = 'Judul buku wajib diisi.'
  if (!author.trim()) errors.author = 'Nama penulis wajib diisi.'
  return errors
}

/**
 * Form tambah/edit buku. `initialBook` null berarti mode tambah.
 * Validasi dijalankan saat submit dan feedback langsung hilang saat user mengetik.
 */
export default function BookForm({
  initialBook = null,
  onSubmit,
  onCancel = () => {},
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // Saat tombol "Ubah" ditekan, isi form mengikuti buku yang dipilih.
  useEffect(() => {
    setForm(
      initialBook
        ? {
            title: initialBook.title,
            author: initialBook.author,
            status: initialBook.status,
          }
        : EMPTY_FORM,
    )
    setErrors({})
  }, [initialBook])

  const isEditing = Boolean(initialBook)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    })
    if (!isEditing) setForm(EMPTY_FORM)
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? 'Ubah Buku' : 'Tambah Buku'}</h2>

      <label className="field">
        <span>Judul</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="mis. Laut Bercerita"
          aria-invalid={Boolean(errors.title)}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <small className="error-text">{errors.title}</small>}
      </label>

      <label className="field">
        <span>Penulis</span>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="mis. Leila S. Chudori"
          aria-invalid={Boolean(errors.author)}
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <small className="error-text">{errors.author}</small>}
      </label>

      <label className="field">
        <span>Status</span>
        <select name="status" value={form.status} onChange={handleChange}>
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(STATUSES.map((status) => status.value)).isRequired,
})

BookForm.propTypes = {
  initialBook: bookShape,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
}

