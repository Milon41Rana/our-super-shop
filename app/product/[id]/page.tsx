'use client';
import React from 'react';
import { useParams } from 'next/navigation'; // Tool to get id from parameters
import Navbar from '../../components/Navbar';

const products = [
  { id: 1, name: 'Smart Watch', price: '৳ 1,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', desc: 'An amazing smart watch that will double your style.' },
  { id: 2, name: 'Running Shoes', price: '৳ 2,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', desc: 'Comfortable running shoes, perfect for long walks.' },
  { id: 3, name: 'Leather Bag', price: '৳ 3,500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop', desc: '100% original leather bag, the best choice for the office.' },
  { id: 4, name: 'Headphone', price: '৳ 900', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', desc: 'There will be no compromise on bass and sound quality.' },
  { id: 5, name: 'Sunglasses', price: '৳ 1,200', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', desc: 'Protect your eyes from the sun in a stylish way.' },
  { id: 6, name: 'Gaming Mouse', price: '৳ 850', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', desc: 'High DPI gaming mouse for gamers.' },
];

export default function ProductDetails() {
  // Using hook to get the id (it will never fail)
  const params = useParams();
  
  // Checking for id
  if (!params?.id) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Product not found! (ID: {params.id}) 😢</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar cartCount={0} /> 
      
      <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ color: '#333' }}>{product.name}</h1>
            <h2 style={{ color: '#f85606' }}>{product.price}</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{product.desc}</p>
            <div style={{ marginTop: '20px' }}>
                <button style={{ padding: '12px 25px', backgroundColor: '#f85606', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                    Buy Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
