'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartCount, totalPrice, setLastOrder, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const customerData = Object.fromEntries(formData.entries());

    const order = {
      customer: customerData,
      items: cartItems,
      total: totalPrice,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        // সার্ভার থেকে পাওয়া এরর মেসেজ ব্যবহার করা
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order. Please try again.');
      }

      // শুধুমাত্র সফল অর্ডারের পরেই কার্ট ক্লিয়ার এবং রিডাইরেক্ট করা
      setLastOrder(order);
      clearCart();
      router.push('/order-confirmation');

    } catch (err: any) {
      console.error('Checkout Error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        
        {cartCount === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
             <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
             <p className="text-gray-500">You cannot proceed to checkout without items in your cart.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <form onSubmit={handleCheckout}>
                  {/* Form fields... */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input type="text" id="fullName" name="fullName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                    <textarea id="address" name="address" rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required></textarea>
                  </div>
                  
                  {error && (
                    <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-md">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <button 
                      type="submit" 
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order (Cash on Delivery)'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Your Order ({cartCount} items)</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
                  <span>Total</span>
                  <span>{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
