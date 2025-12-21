'''
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// POST handler for creating a new order
export async function POST(request: Request) {
  try {
    // First, ensure the 'orders' table exists
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT NOT NULL,
        items JSONB NOT NULL, 
        total_price NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Now, insert the new order
    const orderData = await request.json();
    const { customer, items, total } = orderData;

    if (!customer || !items || !total) {
        return NextResponse.json({ error: 'Missing required order data' }, { status: 400 });
    }

    // items অ্যারেটিকে JSON স্ট্রিং-এ রূপান্তর করতে হবে
    const itemsJson = JSON.stringify(items);

    const result = await sql`
      INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_price)
      VALUES (${customer.fullName}, ${customer.phone}, ${customer.address}, ${itemsJson}, ${total});
    `;

    return NextResponse.json({ message: 'Order created successfully', result }, { status: 201 });

  } catch (error) {
    console.error('Database Error:', error);
    // development-এ বিস্তারিত error দেখানো ভালো, কিন্তু production-এ সাধারণ বার্তা দেখানো উচিত
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
'''