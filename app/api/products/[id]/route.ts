
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET a single product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const result = await sql`SELECT * FROM products WHERE id = ${params.id};`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ product: result.rows[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// UPDATE a product by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, price, img, desc } = await request.json();
        
        if (!name || !price || !img || !desc) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const result = await sql`
            UPDATE products 
            SET name = ${name}, price = ${price}, image_url = ${img}, description = ${desc}
            WHERE id = ${params.id}
            RETURNING *;
        `;

        if (result.rows.length === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated successfully", product: result.rows[0] }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


// DELETE a product by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const result = await sql`DELETE FROM products WHERE id = ${params.id} RETURNING *;`;
        if (result.rowCount === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
