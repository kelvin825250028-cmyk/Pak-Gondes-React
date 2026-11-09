// Runtime validation coverage for: category-specific contact form menu options.
import { describe, expect, it } from 'vitest'
import { createContactOrder, menuByCategory } from './order-menu.js'

describe('contact order menu categories', () => {
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
})
