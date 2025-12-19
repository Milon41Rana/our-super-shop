'use client'; // This is now a client component

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link
import Navbar from './components/Navbar';
import { useCart } from './context/CartContext'; // Import useCart

// Define the Product type again for clarity
interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

export default function Home() {
  const { addToCart } = useCart(); // Get the addToCart function
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          { id: 1, name: 'Sample Product 1', price: '৳500', image_url: 'https://via.placeholder.com/300/FF5733/FFFFFF?text=Product+1' },
          { id: 2, name: 'Sample Product 2', price: '৳750', image_url: 'https://via.placeholder.com/300/33FF57/FFFFFF?text=Product+2' },
          { id: 3, name: 'Sample Product 3', price: '৳1200', image_url: 'https://via.placeholder.com/300/3357FF/FFFFFF?text=Product+3' },
        ];
        setProducts(mockProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar /> 
      <div className="bg-orange-500 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">Our Super Shop (Interactive) 🛍️</h1>
        <p className="text-lg">Buy the best products at the lowest prices</p>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 inline-block">
          🔥 New Collection ({products.length})
        </h2>
        {loading ? (
            <p>Loading products...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow border border-gray-100">
            <h3 className="text-xl text-gray-600 font-bold">No products yet!</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                <Link href={`/product/${product.id}`} className="flex-grow">
                  <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden relative">
                    <img 
                      src={product.image_url || "https://via.placeholder.com/300"} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                </Link>
                <p className="text-orange-600 font-bold text-xl mb-2">{product.price}</p>
                <button 
                  onClick={() => addToCart(product)} 
                  className="w-full bg-gray-900 text-white py-2 rounded hover:bg-orange-600 transition-colors mt-auto"
                >
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
