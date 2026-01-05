import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  return NextResponse.json(await Product.find({}).sort({ _id: -1 }));
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    body.price = body.price.toString().replace(/[^\d.,]/g, ''); // Fixes Peso formatting
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "DB Auth Fail" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;
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
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}