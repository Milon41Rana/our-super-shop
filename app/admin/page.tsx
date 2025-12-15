'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function AdminDashboard() {
  // ১. পণ্যের তথ্য রাখার জন্য স্টেট (Temporary Memory)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    desc: ''
  });

  // ২. প্রিভিউ লিস্ট (যাতে আপনি দেখতে পান আপলোড করলে কেমন দেখাবে)
  const [products, setProducts] = useState([
    { id: 1, name: 'Demo Product', price: '৳ 500', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' }
  ]);

  // ইনপুট বক্সে লিখলে সেটা মেমোরিতে সেভ হবে
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // "Add Product" বাটনে চাপ দিলে যা হবে
  const handleSubmit = (e: any) => {
    e.preventDefault(); // পেজ রিলোড বন্ধ করা
    if (!formData.name || !formData.price) return alert('নাম এবং দাম দিতেই হবে!');
    
    // নতুন পণ্য লিস্টে যোগ করা (এটা এখন শুধু ব্রাউজারে দেখাবে)
    const newProduct = { ...formData, id: Date.now() };
    setProducts([newProduct, ...products]);
    
    // ফর্ম খালি করে দেওয়া
    setFormData({ name: '', price: '', img: '', desc: '' });
    alert('পণ্যটি সফলভাবে যোগ করা হয়েছে! (ডেমো)');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar cartCount={0} />
      
      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* বাম পাশ: আপলোড ফর্ম (Admin Panel) */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#222', borderBottom: '2px solid #f85606', paddingBottom: '10px', display: 'inline-block' }}>📦 নতুন পণ্য যোগ করুন</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>আপনার দোকানের নতুন কালেকশন এখানে আপলোড করুন।</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" name="name" placeholder="পণ্যের নাম (যেমন: কোয়েল পাখির ডিম)" 
                  value={formData.name} onChange={handleChange}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                />
                
                <input 
                  type="text" name="price" placeholder="দাম (যেমন: ৳ ১৫০)" 
                  value={formData.price} onChange={handleChange}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                />

                <input 
                  type="text" name="img" placeholder="ছবির লিংক (Unsplash বা অন্য লিংক)" 
                  value={formData.img} onChange={handleChange}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                />
                
                <textarea 
                  name="desc" placeholder="পণ্যের বিবরণ লিখুন..." 
                  value={formData.desc} onChange={handleChange}
                  rows={3}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px', fontFamily: 'Arial' }} 
                />

                <button type="submit" style={{ padding: '15px', backgroundColor: '#f85606', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
                    🚀 পণ্য আপলোড করুন
                </button>
            </form>
        </div>

        {/* ডান পাশ: লাইভ প্রিভিউ (যেটা ওয়েবসাইটে দেখা যাবে) */}
        <div style={{ flex: 1 }}>
            <h3 style={{ color: '#555' }}>👀 লাইভ প্রিভিউ (Live Preview)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                {products.map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <img src={p.img || 'https://via.placeholder.com/100'} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                        <div>
                            <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{p.name}</h4>
                            <p style={{ margin: 0, color: '#f85606', fontWeight: 'bold' }}>{p.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
