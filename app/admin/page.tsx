"use client";
import { useState } from 'react';

export default function AdminPage() {
  const [form, setForm] = useState({ name: '', price: '', image: '', shopeeLink: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Product added to your Marketplace!");
      setForm({ name: '', price: '', image: '', shopeeLink: '' }); // Clear form
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Add New Tech Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="border p-3 rounded" placeholder="Product Name (e.g. RTX 4060)" 
          onChange={e => setForm({...form, name: e.target.value})} value={form.name} required />
        
        <input className="border p-3 rounded" placeholder="Price (e.g. ₱20,000)" 
          onChange={e => setForm({...form, price: e.target.value})} value={form.price} required />
        
        <input className="border p-3 rounded" placeholder="Shopee Link" 
          onChange={e => setForm({...form, shopeeLink: e.target.value})} value={form.shopeeLink} required />
        
        <input className="border p-3 rounded" placeholder="Image URL (Right-click image online -> Copy Link)" 
          onChange={e => setForm({...form, image: e.target.value})} value={form.image} required />
        
        <button type="submit" className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">
          Upload to Marketplace
        </button>
      </form>
      <a href="/" className="block text-center mt-4 text-gray-500 underline">Back to Home</a>
    </div>
  );
}
