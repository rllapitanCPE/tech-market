import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    await dbConnect(); // Open the tunnel
    const body = await req.json(); // Wait for the data from your form
    
    // Explicitly create and wait for the save
    const newProduct = await Product.create({
      name: body.name,
      price: body.price,
      image: body.image,
      shopeeLink: body.shopeeLink
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("DEPLOYMENT CRASH:", error);
    return NextResponse.json({ error: "Database rejected the save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}