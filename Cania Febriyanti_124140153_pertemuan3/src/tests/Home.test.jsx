import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home/Home.jsx'
import { BookProvider, STORAGE_KEY } from '../context/BookContext.jsx'

// Integrasi: Context + custom hook localStorage + halaman Home.
function renderHome() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <BookProvider>
        <Home />
      </BookProvider>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('Home', () => {
  it('menambahkan buku baru dan menyimpannya ke localStorage', async () => {
    const user = userEvent.setup()
    renderHome()

    await user.type(screen.getByRole('textbox', { name: 'Judul' }), 'Laut Bercerita')
    await user.type(
      screen.getByRole('textbox', { name: 'Penulis' }),
      'Leila S. Chudori',
    )
    await user.selectOptions(screen.getByRole('combobox', { name: 'Status' }), 'beli')
    await user.click(screen.getByRole('button', { name: 'Tambah Buku' }))

    expect(screen.getByText('Laut Bercerita')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(stored[0]).toMatchObject({
      title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      status: 'beli',
    })
  })

  it('memfilter daftar lewat kata kunci penulis', async () => {
    const user = userEvent.setup()
    renderHome()

    expect(screen.getAllByRole('listitem')).toHaveLength(3)

    await user.type(screen.getByRole('searchbox'), 'pram')

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument()
    expect(screen.getByText('1 buku ditemukan')).toBeInTheDocument()
  })

  it('mengubah buku lalu kembali ke mode tambah', async () => {
    const user = userEvent.setup()
    renderHome()

    await user.click(screen.getAllByRole('button', { name: 'Ubah' })[0])

    const titleInput = screen.getByRole('textbox', { name: 'Judul' })
    expect(screen.getByRole('heading', { name: 'Ubah Buku' })).toBeInTheDocument()

    await user.clear(titleInput)
    await user.type(titleInput, 'Laskar Pelangi (Edisi Baru)')
    await user.click(screen.getByRole('button', { name: 'Simpan Perubahan' }))

    expect(screen.getByText('Laskar Pelangi (Edisi Baru)')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tambah Buku' })).toBeInTheDocument()
  })

  it('menghapus buku setelah konfirmasi', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderHome()

    await user.click(screen.getAllByRole('button', { name: 'Hapus' })[0])

    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
