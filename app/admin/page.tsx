"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProducts = () => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Execute deletion protocol for this unit?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b-2 border-cyan-900 pb-6">
          <h1 className="text-3xl font-black italic tracking-widest">TECHTONIC ADMIN</h1>
          <span className="bg-cyan-500 text-black px-4 py-1 font-black text-xs">BY LESLIE</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/40 p-8 rounded-2xl border border-cyan-900/50 mb-12 shadow-[0_0_50px_rgba(6,182,212,0.05)]">
           <input className="bg-black border border-cyan-900 p-4 rounded text-white focus:border-cyan-400 outline-none" placeholder="UNIT NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
           <input className="bg-black border border-cyan-900 p-4 rounded text-white focus:border-cyan-400 outline-none" placeholder="PRICE (NUMBERS ONLY)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
           <input className="bg-black border border-cyan-900 p-4 rounded text-white focus:border-cyan-400 outline-none md:col-span-2" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
           <input className="bg-black border border-cyan-900 p-4 rounded text-white focus:border-cyan-400 outline-none md:col-span-2" placeholder="IMAGE SOURCE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
           <button className="md:col-span-2 bg-cyan-500 text-black font-black py-4 rounded hover:bg-white transition-all uppercase tracking-widest">
             {isEditing ? "Overwrite Records" : "Deploy Unit to Grid"}
           </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-[0.4em] text-slate-500 mb-6 uppercase italic">Active Inventory Status</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-slate-950 border border-cyan-900/30 p-5 rounded-lg hover:border-cyan-500 transition-colors">
              <span className="font-bold text-slate-200">{p.name}</span>
              <div className="flex gap-4">
                <button onClick={() => {setForm(p); setIsEditing(true);}} className="text-xs bg-cyan-900/20 px-4 py-2 rounded border border-cyan-900 text-cyan-400 hover:bg-cyan-900">EDIT</button>
                <button onClick={() => deleteProduct(p._id)} className="text-xs bg-red-900/20 px-4 py-2 rounded border border-red-900 text-red-500 hover:bg-red-900">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}