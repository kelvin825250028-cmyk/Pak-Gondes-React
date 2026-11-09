// Runtime validation coverage for: cart orders shared with the admin dashboard.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { readOrders, saveOrders } from './cart-utils.js'

describe('order storage', () => {
  const storage = new Map()
  const localStorageMock = {
    getItem: vi.fn((key) => storage.get(key) ?? null),
    setItem: vi.fn((key, value) => storage.set(key, String(value))),
    removeItem: vi.fn((key) => storage.delete(key)),
    clear: vi.fn(() => storage.clear()),
  }

  afterEach(() => {
    storage.clear()
    vi.stubGlobal('localStorage', localStorageMock)
    vi.clearAllMocks()
  })

  it('saves orders so the admin dashboard can read them', () => {
    vi.stubGlobal('localStorage', localStorageMock)
    const orders = [{ id: 'PG-123', customer: 'Pengunjung', items: [], total: 0, status: 'Baru' }]

    saveOrders(orders)

    expect(readOrders()).toEqual(orders)
  })

  it('returns an empty list when there are no orders yet', () => {
    vi.stubGlobal('localStorage', localStorageMock)

    expect(readOrders()).toEqual([])
  })
})
