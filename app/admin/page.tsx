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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.img || !formData.desc) {
      return alert('Please fill in all fields.');
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (response.ok) {
        alert('Product added successfully! 🎉');
        setFormData({ name: '', price: '', img: '', desc: '' });
      } else {
        const errorData = await response.json();
        alert(`Failed to add product: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred on the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar cartCount={0} />
      
      <div style={{ maxWidth: '600px', margin: '50px auto', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>📦 Add New Product</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input 
                type="text" name="name" placeholder="Product Name (e.g., Quail Eggs)" 
                value={formData.name} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />
              
              <input 
                type="number" name="price" placeholder="Price (e.g., 150)" 
                value={formData.price} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />

              <input 
                type="text" name="img" placeholder="Image URL (from Unsplash or other source)" 
                value={formData.img} onChange={handleChange}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }} 
              />
              
              <textarea 
                name="desc" placeholder="Product description..." 
                value={formData.desc} onChange={handleChange}
                rows={4}
                style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', fontFamily: 'Arial' }} 
              />

              <button 
                type="submit" 
                disabled={loading}
                style={{ padding: '15px', backgroundColor: loading ? '#ccc' : '#f85606', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                  {loading ? 'Uploading...' : '🚀 Upload Product'}
              </button>
          </form>
      </div>
    </div>
  );
}
