
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !price || !img || !desc) {
      setError('Please fill in all fields.');
      return;
    }
    
    // URL validation for the image
    const urlPattern = new RegExp('^(https?|ftp)://[^\\s/$.?#].[^\\s]*$', 'i');
    if (!urlPattern.test(img)) {
      setError('Please enter a valid Image URL starting with http:// or https://');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name,
            price: parseFloat(price), // Ensure price is a number
            img,
            desc
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSuccess('Product added successfully! Redirecting to admin dashboard...');
      // Clear form
      setName('');
      setPrice('');
      setImg('');
      setDesc('');

      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        router.push('/admin');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <Link href="/admin">
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
                    Back to Dashboard
                </button>
            </Link>
        </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
        {success && <p className="text-green-500 bg-green-100 p-3 rounded-md">{success}</p>}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
