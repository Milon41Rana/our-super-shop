import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, img, desc } = body;

    if (!name || !price || !img || !desc) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Sending data to the database (no password in the code, everything is secure)
    await sql`
      INSERT INTO products (name, price, image_url, description)
      VALUES (${name}, ${price}, ${img}, ${desc});
    `;

    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetching products from the database
    const { rows } = await sql`SELECT * FROM products ORDER BY id DESC`;
    return NextResponse.json({ products: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
