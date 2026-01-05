"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProducts = () => {
    fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("SYNC SUCCESSFUL");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      fetchProducts();
    } else {
      alert("CRITICAL SYNC ERROR: Verify MongoDB Credentials in Vercel");
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Execute Deletion?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b-4 border-cyan-500 pb-8 mb-16">
          <h1 className="text-4xl font-black italic">TECHTONIC COMMAND</h1>
          <div className="bg-white text-black px-10 py-4 rounded-xl text-center">
            <p className="text-xs font-bold uppercase text-gray-500 leading-none mb-1">Authenticated</p>
            <p className="text-4xl font-black italic tracking-tighter">LESLIE</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/30 p-10 rounded-[3rem] border border-cyan-500/20 mb-20">
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-6 rounded-2xl text-2xl hover:bg-white transition-all uppercase">Deploy To Grid</button>
        </form>

        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-cyan-500 tracking-[0.3em] uppercase mb-4">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] p-8 rounded-3xl border-l-8 border-cyan-500">
              <span className="text-2xl font-black italic uppercase">{p.name}</span>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="border-2 border-cyan-500 text-cyan-500 px-8 py-2 rounded-xl font-bold hover:bg-cyan-500 hover:text-black">EDIT</button>
                <button onClick={() => deleteProduct(p._id)} className="border-2 border-red-500 text-red-500 px-8 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}