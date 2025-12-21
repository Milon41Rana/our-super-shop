
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const order = await request.json();
    const { customer, items, total } = order;

    // ইনপুট ভ্যালিডেশন
    if (!customer || !items || !total) {
      return NextResponse.json({ message: 'Missing required order fields' }, { status: 400 });
    }

    // ডেটাবেসে অর্ডার ডেটা সন্নিবেশ করা হচ্ছে
    // এখানে ধরা হচ্ছে যে আপনার একটি `orders` টেবিল আছে
    const result = await sql`
      INSERT INTO orders (customer_info, items, total_price)
      VALUES (${JSON.stringify(customer)}, ${JSON.stringify(items)}, ${total});
    `;

    return NextResponse.json({ message: 'Order created successfully', data: result }, { status: 201 });

  } catch (error) {
    console.error('Failed to create order:', error);
    // এরর অবজেক্টকে টাইপ অ্যাসার্ট করা হচ্ছে
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to create order', error: errorMessage }, { status: 500 });
  }
}
