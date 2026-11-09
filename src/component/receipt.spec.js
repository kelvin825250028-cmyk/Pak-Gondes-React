// Runtime validation coverage for: printable receipt content.
import { describe, expect, it } from 'vitest'
import { buildReceiptHtml } from './receipt.js'

describe('printable order receipt', () => {
  it('includes customer, purchased items, quantities, and the total', () => {
    const html = buildReceiptHtml({
      id: 'PG-123',
      createdAt: '2026-11-09T14:00:00.000Z',
      customer: 'Budi Santoso',
      phone: '081234567890',
      service: 'Take Away',
      notes: '',
      items: [{ id: 'ayam', name: 'Nasi Ayam Geprek', price: 30000, quantity: 2 }],
      total: 60000,
    })

    expect(html).toContain('Budi Santoso')
    expect(html).toContain('Nasi Ayam Geprek')
    expect(html).toContain('>2</td>')
    expect(html).toMatch(/Rp\s*60\.000/)
    expect(html).toContain('@media print')
  })

  it('escapes user-provided values in the printed document', () => {
    const html = buildReceiptHtml({
      id: 'PG-123',
      createdAt: '2026-11-09T14:00:00.000Z',
      customer: '<img src=x onerror=alert(1)>',
      phone: '081234567890',
      service: 'Take Away',
      notes: '',
      items: [{ id: 'ayam', name: '<script>alert(1)</script>', price: 30000, quantity: 1 }],
      total: 30000,
    })

    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(html).not.toContain('<script>alert(1)</script>')
  })
})
