import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find({}).sort({ _id: -1 }); // Newest first
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    // Ensure price is stored as a clean string
    const cleanBody = {
      ...body,
      price: body.price.toString().replace(/[^\d.,]/g, '')
    };
    const newProduct = await Product.create(cleanBody);
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;
    // Clean price before updating
    if (updateData.price) {
      updateData.price = updateData.price.toString().replace(/[^\d.,]/g, '');
    }
    const updated = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}