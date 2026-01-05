import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    await dbConnect(); //
    const body = await req.json();
    
    // Explicitly using .create and awaiting the result
    const newProduct = await Product.create({
      name: body.name,
      price: body.price,
      image: body.image,
      shopeeLink: body.shopeeLink
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ error: "Failed to save to MongoDB" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ _id: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { _id, ...updateData } = body;
  const updated = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}