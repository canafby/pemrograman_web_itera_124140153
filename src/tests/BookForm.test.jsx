import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookForm from '../components/BookForm/BookForm.jsx'

describe('BookForm', () => {
  it('menampilkan pesan error saat judul dan penulis kosong', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Tambah Buku' }))

    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument()
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Judul/ })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mengirim data yang sudah di-trim dan status pilihan', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)

    await user.type(screen.getByRole('textbox', { name: 'Judul' }), '  Laut Bercerita  ')
    await user.type(
      screen.getByRole('textbox', { name: 'Penulis' }),
      ' Leila S. Chudori ',
    )
    await user.selectOptions(screen.getByLabelText('Status'), 'baca')
    await user.click(screen.getByRole('button', { name: 'Tambah Buku' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      status: 'baca',
    })
  })

  it('menghapus pesan error begitu user mulai mengetik', async () => {
    const user = userEvent.setup()
    render(<BookForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Tambah Buku' }))
    await user.type(screen.getByRole('textbox', { name: /Judul/ }), 'P')

    expect(screen.queryByText('Judul buku wajib diisi.')).not.toBeInTheDocument()
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument()
  })
})
