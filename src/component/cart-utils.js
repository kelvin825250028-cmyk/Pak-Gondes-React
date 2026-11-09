const ORDER_STORAGE_KEY = 'pakgondes_orders'

export function readOrders() {
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]')
}

export function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders))
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}
