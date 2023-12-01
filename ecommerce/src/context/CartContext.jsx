import { createContext, useEffect, useState } from 'react'

import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const initialCart = getLocalStorage('cart') || []
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    setLocalStorage('cart', cart)
  }, [cart])

  const addProduct = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.reduce((acc, item) => {
        if (item.id === product.id) {
          return [
            ...acc,
            { ...item, quantity: item.quantity + product.quantity },
          ]
        }
        return [...acc, item]
      }, [])
      if (!updatedCart.some((item) => item.id === product.id)) {
        updatedCart.push(product)
      }
      return updatedCart
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const removeProduct = (productId) => {
    setCart(cart.filter((product) => product.id !== productId))
  }

  const cartTotal = () => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    return totalPrice
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, clearCart, removeProduct, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}
