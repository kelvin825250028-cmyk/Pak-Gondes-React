import { useEffect, useState } from 'react'
import { CartContext } from './cart-context.js'
const CART_STORAGE_KEY = 'pakgondes_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'))

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product) {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id)
      if (existing) {
        return currentItems.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
      }
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(id, quantity) {
    setItems((currentItems) => (
      quantity > 0
        ? currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        : currentItems.filter((item) => item.id !== id)
    ))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((amount, item) => amount + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, total, addItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
