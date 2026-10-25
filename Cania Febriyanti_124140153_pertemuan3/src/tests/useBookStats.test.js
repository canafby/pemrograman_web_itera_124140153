import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import useBookStats from '../hooks/useBookStats.js'

const books = [
  { id: '1', title: 'A', author: 'X', status: 'milik' },
  { id: '2', title: 'B', author: 'Y', status: 'milik' },
  { id: '3', title: 'C', author: 'Z', status: 'baca' },
]

describe('useBookStats', () => {
  it('menghitung total dan jumlah per status', () => {
    const { result } = renderHook(() => useBookStats(books))

    expect(result.current.total).toBe(3)
    expect(result.current.perStatus).toEqual([
      { value: 'milik', label: 'Dimiliki', count: 2 },
      { value: 'baca', label: 'Sedang Dibaca', count: 1 },
      { value: 'beli', label: 'Ingin Dibeli', count: 0 },
    ])
  })

  it('mengembalikan 0% saat koleksi kosong (tanpa pembagian nol)', () => {
    const { result } = renderHook(() => useBookStats([]))

    expect(result.current.total).toBe(0)
    expect(result.current.percentOf(0)).toBe(0)
  })
})
