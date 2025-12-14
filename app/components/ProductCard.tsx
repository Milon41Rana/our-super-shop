'use client';
import React from 'react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    img: string;
  };
  onAddToCart: (name: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductProps) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px', width: '160px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
      <img src={product.img} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }} />
      <h4 style={{ fontSize: '14px', margin: '10px 0 5px 0', flexGrow: 1 }}>{product.name}</h4>
      <p style={{ color: '#f85606', fontWeight: 'bold', margin: 0 }}>{product.price}</p>
      
      <button 
        onClick={() => onAddToCart(product.name)}
        style={{ width: '100%', marginTop: '10px', padding: '8px', background: '#222', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Add to Cart +
      </button>
    </div>
  );
                 }
