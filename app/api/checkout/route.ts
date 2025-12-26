
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET all orders for the admin panel
export async function GET() {
    try {
        // Use LEFT JOIN to be more robust. If a user is deleted, we still get the order.
        const { rows: orders } = await sql`
            SELECT 
                o.id, 
                o.user_id, 
                u.name as user_name, 
                o.total_amount, 
                o.status, 
                o.created_at
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC;
        `;
        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        // Send the actual error message back for better debugging
        return NextResponse.json({ message: `Failed to fetch orders: ${(error as Error).message}` }, { status: 500 });
    }
}

// POST a new order (checkout)
export async function POST(request: Request) {
    try {
        const { userId, cart, total } = await request.json();

        if (!userId || !cart || !total) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Create the order
        const result = await sql`
            INSERT INTO orders (user_id, total_amount, status)
            VALUES (${userId}, ${total}, 'Pending')
            RETURNING id;
        `;
        const orderId = result.rows[0].id;

        // Create order items
        for (const item of cart) {
            await sql`
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (${orderId}, ${item.id}, ${item.quantity}, ${item.price});
            `;
        }

        return NextResponse.json({ message: 'Order created successfully', orderId }, { status: 201 });

    } catch (error) {
        console.error('Error in checkout:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
