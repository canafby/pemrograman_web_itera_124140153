import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Stats from './pages/Stats/Stats.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">MB</span>
          <div>
            <h1>Manajemen Buku</h1>
            <p className="brand-sub">Catatan koleksi buku pribadi</p>
          </div>
        </div>

        <nav className="nav" aria-label="Navigasi utama">
          <NavLink to="/" end>
            Buku Saya
          </NavLink>
          <NavLink to="/statistik">Statistik</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
          <Route
            path="*"
            element={<p className="empty">Halaman tidak ditemukan.</p>}
          />
        </Routes>
      </main>
    </div>
  )
}
