"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    
    const response = await fetch('/api/products', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("DATABASE SYNC COMPLETE");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      await fetchProducts(); // Force refresh the list immediately
    } else {
      alert("SYNC ERROR: Check MongoDB Connection");
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Delete this from Leslie's Shop?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-cyan-500 pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">TECHTONIC COMMAND</h1>
            <p className="text-cyan-500 font-bold tracking-[0.5em] mt-2">SEISMIC INVENTORY MANAGEMENT</p>
          </div>
          <div className="mt-6 md:mt-0 bg-white text-black px-8 py-4 rounded-xl">
            <p className="text-xs font-black uppercase text-center text-gray-500">Admin access</p>
            <p className="text-3xl font-black italic tracking-widest uppercase">LESLIE</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/20 p-10 rounded-[2.5rem] border border-cyan-500/20 mb-20">
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-cyan-500" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-cyan-500" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-cyan-500 md:col-span-2" placeholder="SHOPEE LINK" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-cyan-500 md:col-span-2" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-6 rounded-2xl hover:bg-white transition-all uppercase text-xl">
            {isEditing ? "OVERWRITE UNIT" : "DEPLOY TO MARKET"}
          </button>
        </form>

        <div className="grid gap-6">
          <h2 className="text-2xl font-black italic text-cyan-500 mb-4 tracking-widest uppercase underline underline-offset-8">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border-l-8 border-cyan-500 p-8 rounded-3xl">
              <span className="text-2xl font-black uppercase italic tracking-tight">{p.name}</span>
              <div className="flex gap-4">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-xl font-black hover:bg-cyan-500 hover:text-black">EDIT</button>
                <button onClick={() => deleteProduct(p._id)} className="border-2 border-red-500 text-red-500 px-8 py-3 rounded-xl font-black hover:bg-red-500 hover:text-white">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}