'use client';
import React from 'react';
import Navbar from '../../../components/Navbar'; // ফোল্ডার থেকে বের হয়ে Navbar আনছি

// আমরা আপাতত ডাটাবেস ছাড়া কাজ করছি, তাই পণ্যের তালিকা এখানেও রাখলাম
const products = [
  { id: 1, name: 'Smart Watch', price: '৳ 1,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', desc: 'অসাধারণ স্মার্ট ওয়াচ, যা আপনার স্টাইল বাড়িয়ে দেবে দ্বিগুণ।' },
  { id: 2, name: 'Running Shoes', price: '৳ 2,200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', desc: 'কমফোর্টেবল রানিং সু, দীর্ঘ সময় হাঁটার জন্য পারফেক্ট।' },
  { id: 3, name: 'Leather Bag', price: '৳ 3,500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop', desc: '১০০% অরিজিনাল লেদার ব্যাগ, অফিসের জন্য সেরা চয়েস।' },
  { id: 4, name: 'Headphone', price: '৳ 900', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', desc: 'বেস এবং সাউন্ড কোয়ালিটি নিয়ে কোনো কথা হবে না।' },
  { id: 5, name: 'Sunglasses', price: '৳ 1,200', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop', desc: 'রোদের হাত থেকে চোখকে রক্ষা করুন স্টাইলিশ ভাবে।' },
  { id: 6, name: 'Gaming Mouse', price: '৳ 850', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', desc: 'গেমারদের জন্য হাই ডিপিআই গেমিং মাউস।' },
];

export default function ProductDetails({ params }: { params: { id: string } }) {
  // ১. URL থেকে আইডি খুঁজে বের করা হচ্ছে
  const productId = parseInt(params.id);
  
  // ২. ওই আইডির পণ্য লিস্ট থেকে খোঁজা হচ্ছে
  const product = products.find((p) => p.id === productId);

  // ৩. যদি ভুল আইডি দেয় (যেমন id=999), তাহলে "পাওয়াস যায়নি" দেখাবে
  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>পণ্যটি খুঁজে পাওয়া যায়নি! 😢</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar cartCount={0} /> 
      
      <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* বাম পাশে ছবি */}
        <div style={{ flex: 1 }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
        </div>

        {/* ডান পাশে ডিটেইলস */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ color: '#333' }}>{product.name}</h1>
            <h2 style={{ color: '#f85606' }}>{product.price}</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{product.desc}</p>
            
            <div style={{ marginTop: '20px' }}>
                <button style={{ padding: '12px 25px', backgroundColor: '#f85606', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                    Buy Now
                </button>
                <button style={{ padding: '12px 25px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}>
                    Add to Cart
                </button>
            </div>
        </div>

      </div>
    </div>
  );
  }
