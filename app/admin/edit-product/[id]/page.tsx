'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductForm {
    name: string;
    price: string;
    img: string;
    desc: string;
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [product, setProduct] = useState<ProductForm>({ name: '', price: '', img: '', desc: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data.');
                }
                const data = await response.json();
                const { name, price, image_url, description } = data.product;
                setProduct({ name, price: price.toString(), img: image_url, desc: description });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!product.name || !product.price || !product.img || !product.desc) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Something went wrong during product update.");
            }

            setSuccess("Product updated successfully!");
            setTimeout(() => router.push('/admin'), 2000); // Redirect to admin after 2 seconds

        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading...</p>;

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <Link href="/admin">
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
                        &larr; Back to Dashboard
                    </button>
                </Link>
            </div>

            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">Error: {error}</p>}
            {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={product.img}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="desc"
                        name="desc"
                        rows={4}
                        value={product.desc}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}
