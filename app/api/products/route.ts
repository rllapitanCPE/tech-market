import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { _id, ...updateData } = body;
  const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  return NextResponse.json(updatedProduct);
}

// THE NEW DELETE FUNCTION
export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}