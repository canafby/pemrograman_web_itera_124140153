import { useEffect } from 'react'
import useBookStats from '../../hooks/useBookStats.js'
import { useBooks } from '../../context/BookContext.jsx'
import './Stats.css'

/** Halaman statistik: ringkasan jumlah buku per status. */
export default function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)

  useEffect(() => {
    document.title = 'Statistik · Manajemen Buku'
  }, [])

  return (
    <div className="stats">
      <h2>Statistik Koleksi</h2>
      <p className="stats-lead">
        Total <strong>{stats.total}</strong> buku tercatat.
      </p>

      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-label">Total Buku</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        {stats.perStatus.map((item) => (
          <div key={item.value} className={`stat-card accent-${item.value}`}>
            <span className="stat-label">{item.label}</span>
            <span className="stat-value">{item.count}</span>
          </div>
        ))}
      </div>

      <section className="stats-bars" aria-label="Sebaran status buku">
        <h3>Sebaran Status</h3>
        {stats.perStatus.map((item) => {
          const percent = stats.percentOf(item.count)
          return (
            <div key={item.value} className="bar-row">
              <span className="bar-label">{item.label}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill fill-${item.value}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="bar-value">
                {item.count} ({percent}%)
              </span>
            </div>
          )
        })}
      </section>

      <p className="stats-footnote">
        Data dihitung langsung dari context buku, jadi selalu ikut berubah saat
        koleksi ditambah, diubah, atau dihapus.
      </p>
    </div>
  )
}
