// Runtime validation coverage for: category-specific contact form menu options.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createContactOrder, getMenuByCategory, menuByCategory } from './order-menu.js'
import { defaultMenuItems, saveMenu } from './menu-data.js'

describe('contact order menu categories', () => {
  const storage = new Map()
  const localStorageMock = {
    getItem: vi.fn((key) => storage.get(key) ?? null),
    setItem: vi.fn((key, value) => storage.set(key, String(value))),
    removeItem: vi.fn((key) => storage.delete(key)),
    clear: vi.fn(() => storage.clear()),
  }

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)
  })

  afterEach(() => {
    storage.clear()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('only offers rice meals in the Paket Nasi category', () => {
    expect(menuByCategory['Paket Nasi']).toContain('Nasi Ayam Geprek Sambal Gondes')
    expect(menuByCategory['Paket Nasi'].some((menu) => menu.includes('Indomie'))).toBe(false)
    expect(menuByCategory['Paket Nasi'].some((menu) => menu.includes('Es Teh'))).toBe(false)
  })

  it('only offers drinks in the Aneka Minuman category', () => {
    expect(menuByCategory['Aneka Minuman']).toContain('Es Teh Manis Jumbo')
    expect(menuByCategory['Aneka Minuman'].some((menu) => menu.includes('Ayam'))).toBe(false)
    expect(menuByCategory['Aneka Minuman'].some((menu) => menu.includes('Indomie'))).toBe(false)
  })

  it('creates a local order with the selected category and correct total', () => {
    const order = createContactOrder({
      category: 'Paket Nasi',
      menu: 'Nasi Ayam Geprek Sambal Gondes',
      customer: ' Budi Santoso ',
      phone: ' 081234567890 ',
      quantity: 2,
      service: 'Take Away',
      notes: ' Pedas level 3 ',
    }, new Date('2026-11-09T14:00:00.000Z'))

    expect(order.category).toBe('Paket Nasi')
    expect(order.items[0].name).toBe('Nasi Ayam Geprek Sambal Gondes')
    expect(order.items[0].quantity).toBe(2)
    expect(order.total).toBe(60000)
    expect(order.customer).toBe('Budi Santoso')
    expect(order.notes).toBe('Pedas level 3')
    expect(order.status).toBe('Baru')
  })

  it('rejects a menu that does not belong to the selected category', () => {
    expect(() => createContactOrder({
      category: 'Paket Nasi',
      menu: 'Es Teh Manis Jumbo',
      customer: 'Budi Santoso',
      phone: '081234567890',
      quantity: 1,
      service: 'Take Away',
      notes: '',
    })).toThrow('Menu tidak sesuai dengan kategori yang dipilih.')
  })

  it('uses newly saved menu items and prices when making website orders', () => {
    const newMenu = {
      id: 'menu-es-kopi-123',
      category: 'Aneka Minuman',
      name: 'Es Kopi Susu',
      price: 15000,
      description: 'Kopi susu dingin.',
    }
    saveMenu([...defaultMenuItems, newMenu])

    expect(getMenuByCategory()['Aneka Minuman']).toContain('Es Kopi Susu')
    const order = createContactOrder({
      category: 'Aneka Minuman',
      menu: 'Es Kopi Susu',
      customer: 'Nadia',
      phone: '081234567890',
      quantity: 2,
      service: 'Take Away',
      notes: '',
    })
    expect(order.items[0].price).toBe(15000)
    expect(order.total).toBe(30000)
  })

  it('lets the website order a package added from the dashboard catalog', () => {
    const packageItem = {
      id: 'menu-paket-hemat-123',
      category: 'Paket Spesial',
      name: 'Paket Hemat Berdua',
      price: 50000,
      description: 'Dua porsi ayam dan dua minuman.',
    }
    saveMenu([...defaultMenuItems, packageItem])

    expect(getMenuByCategory()['Paket Spesial']).toContain(packageItem.name)
    const order = createContactOrder({
      category: 'Paket Spesial',
      menu: packageItem.name,
      customer: 'Nadia',
      phone: '081234567890',
      quantity: 1,
      service: 'Take Away',
      notes: '',
    })
    expect(order.items[0].id).toBe(packageItem.id)
    expect(order.total).toBe(50000)
  })
})
