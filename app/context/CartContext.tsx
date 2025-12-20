'use client';

import React, { createContext, useState, useContext, useMemo } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

// নতুন: অর্ডারের তথ্য ধরে রাখার জন্য ইন্টারফেস
export interface Order {
  customer: { [key: string]: any };
  items: CartItem[];
  total: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void; // নতুন: কার্ট খালি করার ফাংশন
  cartCount: number;
  totalPrice: string;
  lastOrder: Order | null; // নতুন: সর্বশেষ অর্ডারের তথ্য
  setLastOrder: (order: Order) => void; // নতুন: সর্বশেষ অর্ডারের তথ্য সেট করার ফাংশন
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrderState] = useState<Order | null>(null);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const setLastOrder = (order: Order) => {
    setLastOrderState(order);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return acc + price * item.quantity;
    }, 0);
    return `৳${total.toFixed(2)}`;
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice, lastOrder, setLastOrder }}>
      {children}
    </CartContext.Provider>
  );
};
