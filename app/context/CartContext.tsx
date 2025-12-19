
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a product
interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

// Define the shape of the context data
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  cartCount: number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
    // In a real app, you might want to handle quantities
    console.log(`${product.name} added to cart!`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount: cartItems.length }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
