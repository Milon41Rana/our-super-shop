'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // CartContext থেকে useCart ইম্পোর্ট করা হলো

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    img: string;
  };
}

// onAddToCart prop-টি এখন আর প্রয়োজন নেই
export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart(); // আমাদের কাস্টম হুক ব্যবহার করে addToCart ফাংশনটি নেওয়া হলো

  const handleAddToCart = () => {
    // quantity ছাড়া বাকি তথ্যগুলো পাঠানো হচ্ছে, কারণ quantity কনটেক্সট নিজেই ম্যানেজ করবে
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img });
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px', width: '160px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
      
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }} />
        <h4 style={{ fontSize: '14px', margin: '10px 0 5px 0', flexGrow: 1, cursor: 'pointer' }}>{product.name}</h4>
      </Link>

      <p style={{ color: '#f85606', fontWeight: 'bold', margin: 0 }}>{product.price}</p>
      
      {/* এখন onClick-এ handleAddToCart ফাংশনটি কল হবে */}
      <button 
        onClick={handleAddToCart}
        style={{ width: '100%', marginTop: '10px', padding: '8px', background: '#222', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Add to Cart +
      </button>
    </div>
  );
}
