'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              Our Shop
            </Link>
          </div>

          {/* Right side icons & Auth Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-600 hover:text-orange-500 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* User Authentication Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/account" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">
                    Account
                  </Link>
                  <button onClick={logout} className="px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
        
                  <Link href="/login" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">
                    Login
                  </Link>
                  <Link href="/register" className="px-3 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
