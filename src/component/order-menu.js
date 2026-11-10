import { defaultMenuItems, groupMenuByCategory, readMenu } from './menu-data.js'

export const menuByCategory = groupMenuByCategory(defaultMenuItems)

export const menuPrices = Object.fromEntries(
  defaultMenuItems.map((item) => [item.name, item.price]),
)

export function getMenuByCategory(items = readMenu()) {
  return groupMenuByCategory(items)
}

export function createContactOrder({ category, menu, customer, phone, quantity, service, notes }, createdAt = new Date()) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('Jumlah pesanan minimal satu.')
  }

  const selectedMenu = readMenu().find((item) => item.category === category && item.name === menu)
  if (!selectedMenu) {
    throw new Error('Menu tidak sesuai dengan kategori yang dipilih.')
  }

  return {
    id: `PG-${createdAt.getTime()}`,
    customer: customer.trim(),
    phone: phone.trim(),
    service,
    notes: notes.trim(),
    category,
    items: [{
      id: selectedMenu.id,
      name: selectedMenu.name,
      price: selectedMenu.price,
      quantity,
    }],
    total: selectedMenu.price * quantity,
    status: 'Baru',
    createdAt: createdAt.toISOString(),
  }
}
