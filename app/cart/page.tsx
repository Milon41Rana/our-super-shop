'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, cartCount, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart ({cartCount})</h1>

        {cartCount === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/" className="inline-block mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <div className="flex items-center mt-2">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="font-bold text-lg text-gray-800">{item.price}</p>
                     <button onClick={() => handleRemove(item.id)} className="text-sm text-red-500 hover:underline mt-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-bold">{totalPrice}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6">
                  <span>Total</span>
                  <span>{totalPrice}</span>
                </div>
                <Link href="/checkout" className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
