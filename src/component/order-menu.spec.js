// Runtime validation coverage for: category-specific contact form menu options.
import { describe, expect, it } from 'vitest'
import { menuByCategory } from './order-menu.js'

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
})
