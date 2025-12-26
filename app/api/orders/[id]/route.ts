
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Handler for updating an order's status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Order ID from the URL
        const { status } = await request.json(); // New status from the request body

        if (!status) {
            return NextResponse.json({ message: 'Status is required' }, { status: 400 });
        }

        // Update the order status in the database
        await sql`UPDATE orders SET status = ${status} WHERE id = ${Number(id)};`;

        return NextResponse.json({ message: 'Order status updated successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json({ message: "Failed to update order status", error }, { status: 500 });
    }
}
