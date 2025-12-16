'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    desc: ''
  });
  const [loading, setLoading] = useState(false); // লোডিং বাটন দেখানোর জন্য

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert('নাম এবং দাম দিতেই হবে!');
    
    setLoading(true); // আপলোড শুরু হলে বাটন ঘুরবে

    try {
      // আমাদের বানানো API-তে তথ্য পাঠানো হচ্ছে
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('আলহামদুলিল্লাহ! পণ্য সফলভাবে আপলোড হয়েছে। 🎉');
        setFormData({ name: '', price: '', img: '', desc: '' }); // ফর্ম খালি করা
      } else {
        alert('দুঃখিত, আপলোড হয়নি। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('সার্ভারে সমস্যা হয়েছে।');
    } finally {
      setLoading(false); // লোডিং শেষ
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar cartCount={0} />
      
      <div style={{ maxWidth: '600px', margin: '50px auto', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>📦 নতুন পণ্য যোগ করুন</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input 
                type="text" name="name" placeholder="পণ্যের নাম (যেমন: কোয়েল পাখির ডিম)" 
                value={formData.name} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />
              
              <input 
                type="text" name="price" placeholder="দাম (যেমন: ৳ ১৫০)" 
                value={formData.price} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />

              <input 
                type="text" name="img" placeholder="ছবির লিংক (Unsplash বা অন্য লিংক)" 
                value={formData.img} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />
              
              <textarea 
                name="desc" placeholder="পণ্যের বিবরণ..." 
                value={formData.desc} onChange={handleChange}
                rows={4}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', fontFamily: 'Arial' }} 
              />

              <button 
                type="submit" 
                disabled={loading} // লোডিং অবস্থায় বাটন কাজ করবে না
                style={{ padding: '15px', backgroundColor: loading ? '#ccc' : '#f85606', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                  {loading ? 'আপলোড হচ্ছে...' : '🚀 পণ্য আপলোড করুন'}
              </button>
          </form>
      </div>
    </div>
  );
  }
