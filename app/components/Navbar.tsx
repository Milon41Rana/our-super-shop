'use client';
import React from 'react';

// এই অংশটি মিসিং ছিল, তাই এরর আসছে
interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#f85606', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
      <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => window.location.reload()}>My Shop 🛍️</h2>
      <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', background: 'white', color: '#f85606', padding: '5px 10px', borderRadius: '20px' }}>
        🛒 Cart ({cartCount})
      </div>
    </nav>
  );
}
