'use client';

import React from 'react';
import { useParams } from 'next/navigation'; // To get the product ID from the URL
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';

// Mock data for products (the same as in the home page)
const mockProducts = [
  { id: 1, name: 'Sample Product 1', price: '৳500', image_url: 'https://via.placeholder.com/300/FF5733/FFFFFF?text=Product+1', description: 'This is a high-quality sample product with amazing features. Built with the best materials and designed to last. Perfect for your daily needs.' },
  { id: 2, name: 'Sample Product 2', price: '৳750', image_url: 'https://via.placeholder.com/300/33FF57/FFFFFF?text=Product+2', description: 'A wonderful and elegant product that stands out. It combines style and functionality seamlessly. You will love it!' },
  { id: 3, name: 'Sample Product 3', price: '৳1200', image_url: 'https://via.placeholder.com/300/3357FF/FFFFFF?text=Product+3', description: 'The latest in our collection, this product offers cutting-edge technology and a sleek design. A must-have for tech enthusiasts.' },
];

export default function ProductDetailPage() {
  const { id } = useParams(); // Get the ID from the URL, e.g., "1", "2"
  const { addToCart } = useCart();

  // Find the product from our mock data
  const product = mockProducts.find(p => p.id.toString() === id);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img src={product.image_url} alt={product.name} className="w-full h-auto rounded-lg" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">Product ID: {product.id}</p>
            <p className="text-3xl font-bold text-orange-600 mb-6">{product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
