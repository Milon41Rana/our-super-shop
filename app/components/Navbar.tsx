'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import { useCart } from '../context/CartContext'; // Import the useCart hook

export default function Navbar() {
  const { cartCount } = useCart(); // Get the cart count from the context

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#f85606', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
      <Link href="/" legacyBehavior>
        <a style={{ textDecoration: 'none', color: 'white', margin: 0, cursor: 'pointer', fontSize: '1.5rem' }}>Our Shop 🛍️</a>
      </Link>
      <Link href="/cart" legacyBehavior>
        <a style={{ textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', background: 'white', color: '#f85606', padding: '5px 10px', borderRadius: '20px', cursor: 'pointer' }}>
          🛒 Cart ({cartCount})
        </a>
      </Link>
    </nav>
  );
}
