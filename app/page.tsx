import React from 'react';

export default function Home() {
  const products = [
    { id: 1, name: 'Smart Watch', price: '৳ 1,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 2, name: 'Running Shoes', price: '৳ 2,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    { id: 3, name: 'Leather Bag', price: '৳ 3,500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop' },
    { id: 4, name: 'Headphone', price: '৳ 900', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 5, name: 'Sunglasses', price: '৳ 1,200', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
    { id: 6, name: 'Gaming Mouse', price: '৳ 850', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* ১. টপ নেভিগেশন বার (Navbar) */}
      <nav style={{ backgroundColor: '#f85606', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
        <h2 style={{ margin: 0 }}>My Shop 🛍️</h2>
        <input 
          type="text" 
          placeholder="Search products..." 
          style={{ padding: '8px', borderRadius: '5px', border: 'none', width: '50%' }}
        />
        <div style={{ fontWeight: 'bold' }}>🛒 Cart (0)</div>
      </nav>

      {/* ২. হিরো ব্যানার (Banner) */}
      <div style={{ backgroundColor: 'white', padding: '40px 20px', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>Big Sale is Live! 🔥</h1>
        <p>সেরা অফারে কিনুন আপনার পছন্দের পণ্য</p>
      </div>

      {/* ৩. পণ্যের গ্যালারি (Product Grid) */}
      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ borderBottom: '2px solid #f85606', paddingBottom: '10px', display: 'inline-block' }}>Just For You</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
          {products.map((product) => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px', width: '160px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }} />
              <h4 style={{ fontSize: '14px', margin: '10px 0 5px 0' }}>{product.name}</h4>
              <p style={{ color: '#f85606', fontWeight: 'bold', margin: 0 }}>{product.price}</p>
              <button style={{ width: '100%', marginTop: '10px', padding: '5px', background: '#222', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ৪. ফুটার (Footer) */}
      <footer style={{ backgroundColor: '#222', color: 'white', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p>&copy; 2024 My Super Shop. All rights reserved.</p>
      </footer>

    </div>
  );
      }
