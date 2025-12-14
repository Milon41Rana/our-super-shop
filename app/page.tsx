'use client';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

// পণ্যের টাইপ বা গঠন কেমন হবে তা এখানে বলা হলো
interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
}

export default function Home() {
  const [cartCount, setCartCount] = useState<number>(0);

  // এখানে বলে দিলাম productName অবশ্যই স্ট্রিং হতে হবে
  const addToCart = (productName: string) => {
    setCartCount(cartCount + 1);
    alert(productName + " সফলভাবে কার্টে যোগ হয়েছে! ✅");
  };

  const products: Product[] = [
    { id: 1, name: 'Smart Watch', price: '৳ 1,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 2, name: 'Running Shoes', price: '৳ 2,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    { id: 3, name: 'Leather Bag', price: '৳ 3,500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop' },
    { id: 4, name: 'Headphone', price: '৳ 900', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 5, name: 'Sunglasses', price: '৳ 1,200', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
    { id: 6, name: 'Gaming Mouse', price: '৳ 850', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar cartCount={cartCount} />

      <div style={{ backgroundColor: 'white', padding: '40px 20px', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: '0 0 10px 0' }}>Big Sale is Live! 🔥</h1>
        <p style={{ color: '#666' }}>সেরা অফারে কিনুন আপনার পছন্দের পণ্য</p>
      </div>

      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '50px' }}>
        <h3 style={{ borderBottom: '2px solid #f85606', paddingBottom: '10px', display: 'inline-block' }}>Just For You</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: '#222', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>&copy; 2025 My Super Shop</p>
      </footer>
    </div>
  );
    }
