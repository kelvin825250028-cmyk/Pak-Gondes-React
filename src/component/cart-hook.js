import { useContext } from 'react'
import { CartContext } from './cart-context.js'

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error('useCart harus digunakan di dalam CartProvider.')
  }
  return cart
}
