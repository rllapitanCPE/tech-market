import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct);
  } catch (e) { return NextResponse.json({ error: e }, { status: 500 }); }
}