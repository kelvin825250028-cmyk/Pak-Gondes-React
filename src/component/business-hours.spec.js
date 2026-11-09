// Runtime validation coverage for: Jakarta store opening hours.
import { describe, expect, it } from 'vitest'
import { isStoreOpen } from './business-hours.js'

describe('isStoreOpen', () => {
  it('is closed before 10:00 WIB', () => {
    expect(isStoreOpen(new Date('2026-11-09T02:59:00.000Z'))).toBe(false)
  })

  it('opens at 10:00 WIB', () => {
    expect(isStoreOpen(new Date('2026-11-09T03:00:00.000Z'))).toBe(true)
  })

  it('stays open until 21:59 WIB', () => {
    expect(isStoreOpen(new Date('2026-11-09T14:59:00.000Z'))).toBe(true)
  })

  it('closes at 22:00 WIB', () => {
    expect(isStoreOpen(new Date('2026-11-09T15:00:00.000Z'))).toBe(false)
  })
})
