import PropTypes from 'prop-types'
import { STATUSES } from '../../context/BookContext.jsx'
import './BookFilter.css'

/**
 * Kontrol pencarian + filter status.
 * Komponen ini "controlled": state tetap di halaman induk supaya bisa
 * dipakai bersama daftar buku dan ringkasan hasil.
 */
export default function BookFilter({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onReset,
  resultCount,
}) {
  return (
    <section className="book-filter" aria-label="Pencarian dan filter buku">
      <label className="filter-search">
        <span className="sr-only">Cari judul atau penulis</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari judul atau nama penulis..."
        />
      </label>

      <div className="filter-status" role="group" aria-label="Filter status">
        <button
          type="button"
          className={status === 'semua' ? 'chip chip-active' : 'chip'}
          onClick={() => onStatusChange('semua')}
        >
          Semua
        </button>
        {STATUSES.map((item) => (
          <button
            key={item.value}
            type="button"
            className={status === item.value ? 'chip chip-active' : 'chip'}
            onClick={() => onStatusChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="filter-meta">
        <span>
          {resultCount} buku ditemukan
        </span>
        {(query || status !== 'semua') && (
          <button type="button" className="link-button" onClick={onReset}>
            Reset filter
          </button>
        )}
      </div>
    </section>
  )
}

BookFilter.propTypes = {
  query: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['semua', ...STATUSES.map((item) => item.value)])
    .isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
}
