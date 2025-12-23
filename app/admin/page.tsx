'use client';

import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Product ডেটার টাইপ নির্ধারণ
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string; // ডেটাবেস থেকে image_url আসছে
}

// একটি কম্পোনেন্ট যা অ্যাক্সেস না থাকলে দেখানো হবে
const AccessDenied = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
    </div>
  );
};

// অ্যাডমিন ড্যাশবোর্ডের মূল কন্টেন্ট
const DashboardContent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to delete product');
      }

      setProducts(products.filter(p => p.id !== productId));

    } catch (err: any) {
      setError(err.message);
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/add-product">
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            + Add New Product
            </button>
        </Link>
      </div>
      <p className="mb-8">Welcome to the Our Shop admin panel. Manage your products efficiently.</p>
      
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-4">Error: {error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Price</th>
                  <th scope="col" className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">
                        <Image src={product.image_url || '/default-image.png'} alt={product.name} width={50} height={50} className="rounded" />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{product.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">${Number(product.price).toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                        <Link href={`/admin/edit-product/${product.id}`} passHref>
                            <button className="text-blue-600 hover:text-blue-800 font-semibold mr-4">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  // The environment variable was not loading correctly on the client side.
  // Hardcoding the email directly is a more reliable solution for this check.
  const isAuthorized = isAuthenticated && user?.email === 'admin@example.com';

  if (!isAuthorized) {
    return <AccessDenied />;
  }

  return <DashboardContent />;
}
