import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookList from '../components/BookList/BookList.jsx'

const books = [
  { id: '1', title: 'Bumi Manusia', author: 'Pramoedya', status: 'baca' },
  { id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'beli' },
]

describe('BookList', () => {
  it('merender semua buku beserta badge status', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument()
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument()
    expect(screen.getByText('Ingin Dibeli')).toBeInTheDocument()
  })

  it('memanggil onDelete dengan buku yang dipilih', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<BookList books={books} onEdit={vi.fn()} onDelete={onDelete} />)

    await user.click(screen.getAllByRole('button', { name: 'Hapus' })[0])

    expect(onDelete).toHaveBeenCalledWith(books[0])
  })

  it('menampilkan empty state saat tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText(/Belum ada buku yang cocok/i)).toBeInTheDocument()
  })
})
