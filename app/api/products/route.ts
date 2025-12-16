import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, img, desc } = body;

    // ডাটাবেসে তথ্য পাঠানো হচ্ছে (কোনো পাসওয়ার্ড কোডে নেই, সব সিকিউর)
    await sql`
      INSERT INTO products (name, price, image_url, description)
      VALUES (${name}, ${price}, ${img}, ${desc});
    `;

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    // ডাটাবেস থেকে পণ্য আনা হচ্ছে
    const { rows } = await sql`SELECT * FROM products ORDER BY id DESC`;
    return NextResponse.json({ products: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
        }
