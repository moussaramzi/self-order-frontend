'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
  
    const addToCart = (item) => {
      setCart([...cart, item]);
      setTotal(total + item.price);
    };
  
    const removeFromCart = (index) => {
      const newCart = [...cart];
      const removedItem = newCart.splice(index, 1)[0];
      setCart(newCart);
      setTotal(total - removedItem.price);
    };
  
    const clearCart = () => {
      setCart([]);
      setTotal(0);
    };
  
    return (
      <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  }

export function useCart() {
  return useContext(CartContext);
}