import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure connection is established
    const body = await req.json();
    
    // This creates the product in your MongoDB collection
    const newProduct = await Product.create(body); 
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: "Database Save Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ _id: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
  }
}