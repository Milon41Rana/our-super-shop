'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function OrderConfirmationPage() {
  const { lastOrder } = useCart();
  const router = useRouter();

  // যদি কোনো অর্ডারের তথ্য না থাকে, তাহলে ব্যবহারকারীকে হোমপেজে পাঠিয়ে দেওয়া হবে
  useEffect(() => {
    if (!lastOrder) {
      router.replace('/');
    }
  }, [lastOrder, router]);

  if (!lastOrder) {
    return null; // অথবা একটি লোডিং স্পিনার দেখানো যেতে পারে
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md text-center">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Thank You For Your Order!</h1>
          <p className="text-gray-600 mt-2">Your order has been placed successfully and will be processed shortly.</p>

          <div className="mt-8 text-left border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                    <p><strong>Billed to:</strong> {lastOrder.customer.fullName}</p>
                    <p><strong>Address:</strong> {lastOrder.customer.address}</p>
                    <p><strong>Phone:</strong> {lastOrder.customer.phone}</p>
                </div>
                
                <h3 className="font-bold border-t border-b py-2">Items Ordered</h3>
                {lastOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{item.price}</p>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-xl border-t pt-4 mt-2">
                    <span>Total Paid</span>
                    <span>{lastOrder.total}</span>
                </div>
            </div>
          </div>

          <Link href="/" className="inline-block mt-8 px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
