import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookFilter from '../components/BookFilter/BookFilter.jsx'

const baseProps = {
  query: '',
  status: 'semua',
  onQueryChange: () => {},
  onStatusChange: () => {},
  onReset: () => {},
  resultCount: 3,
}

describe('BookFilter', () => {
  it('mengirim kata kunci pencarian ke induk', async () => {
    const user = userEvent.setup()
    const onQueryChange = vi.fn()

    // Wrapper kecil supaya input benar-benar controlled seperti di Home.
    function StatefulFilter() {
      const [query, setQuery] = useState('')
      return (
        <BookFilter
          {...baseProps}
          query={query}
          onQueryChange={(value) => {
            setQuery(value)
            onQueryChange(value)
          }}
        />
      )
    }

    render(<StatefulFilter />)
    await user.type(screen.getByRole('searchbox'), 'pram')

    expect(onQueryChange).toHaveBeenLastCalledWith('pram')
  })

  it('mengirim status yang dipilih lewat chip filter', async () => {
    const user = userEvent.setup()
    const onStatusChange = vi.fn()
    render(<BookFilter {...baseProps} onStatusChange={onStatusChange} />)

    await user.click(screen.getByRole('button', { name: 'Ingin Dibeli' }))

    expect(onStatusChange).toHaveBeenCalledWith('beli')
  })

  it('menampilkan jumlah hasil dan tombol reset hanya saat filter aktif', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    const { rerender } = render(<BookFilter {...baseProps} onReset={onReset} />)

    expect(screen.getByText('3 buku ditemukan')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reset filter' })).toBeNull()

    rerender(<BookFilter {...baseProps} query="bumi" onReset={onReset} />)
    await user.click(screen.getByRole('button', { name: 'Reset filter' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
