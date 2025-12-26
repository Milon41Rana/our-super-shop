'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
    id: number;
    user_name: string | null; // User name can be null if user is deleted
    total_amount: number;
    status: string;
    created_at: string;
}

const STATUS_OPTIONS = ["Pending", "Shipped", "Delivered", "Canceled"];

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/checkout'); // Endpoint to get all orders
            const data = await response.json();

            if (!response.ok) {
                // Use the detailed error message from the API
                throw new Error(data.message || 'Failed to fetch orders');
            }
            
            setOrders(data.orders);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!response.ok) {
                 const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update status');
            }

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

        } catch (err: any) {
            alert("Error updating status: " + err.message);
            // Optionally, refresh the orders to revert optimistic update on failure
            fetchOrders();
        }
    };

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Order Management</h1>
                <Link href="/admin">
                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
                        &larr; Back to Dashboard
                    </button>
                </Link>
            </div>

            {loading && <p className="text-center mt-8">Loading orders...</p>}
            {error && <p className="text-center mt-8 text-red-500">Error: {error}</p>}

            {!loading && !error && (
                 <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length > 0 ? orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">#{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.user_name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${order.total_amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`p-2 text-sm rounded-lg border-2 ${order.status === 'Pending' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : order.status === 'Shipped' ? 'bg-blue-100 border-blue-300 text-blue-800' : order.status === 'Delivered' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                                            {STATUS_OPTIONS.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
