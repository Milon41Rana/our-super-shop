'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AccountPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg className="w-20 h-20 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">{user.fullName}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button onClick={() => { logout(); router.push('/'); }} className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          </div>

          {/* Right Panel: Order History */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order History</h2>
              <div className="text-center text-gray-500 py-8">
                <p>You have no orders yet.</p>
                <p className="text-sm mt-2">When you place an order, it will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
