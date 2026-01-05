"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  const refresh = () => fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("DATABASE SYNC SUCCESSFUL");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      refresh();
    } else {
      alert("CRITICAL ERROR: Verify MongoDB Network Access is set to 0.0.0.0/0");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        {/* PRO HEADER STYLE */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-cyan-500 pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">TECHTONIC COMMAND</h1>
            <p className="text-cyan-500 font-bold tracking-[0.5em] mt-2">SEISMIC INVENTORY CONTROL</p>
          </div>
          <div className="mt-6 md:mt-0 bg-white text-black px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <p className="text-xs font-black uppercase text-center text-gray-400">Authenticated</p>
            <p className="text-3xl font-black italic tracking-widest uppercase">LESLIE</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/10 p-10 rounded-[2.5rem] border border-cyan-500/20 mb-20 shadow-2xl">
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none transition-all" placeholder="UNIT NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none transition-all" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-6 rounded-2xl hover:bg-white transition-all uppercase text-xl tracking-widest">
            {isEditing ? "OVERWRITE DATA" : "DEPLOY TO MARKET"}
          </button>
        </form>

        <div className="space-y-6">
          <h2 className="text-2xl font-black italic text-cyan-500 mb-8 uppercase underline decoration-2 underline-offset-8">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border-l-8 border-cyan-500 p-8 rounded-3xl hover:bg-slate-900/50 transition-all shadow-xl">
              <span className="text-2xl font-black uppercase italic tracking-tight mb-4 md:mb-0">{p.name}</span>
              <div className="flex gap-4">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="bg-cyan-500/10 px-8 py-3 rounded-xl border-2 border-cyan-500 text-cyan-400 font-black hover:bg-cyan-500 hover:text-black transition-all uppercase">Edit</button>
                <button onClick={() => {if(confirm("Delete?")) fetch(`/api/products?id=${p._id}`, {method:'DELETE'}).then(()=>refresh())}} className="bg-red-500/10 px-8 py-3 rounded-xl border-2 border-red-500 text-red-500 font-black hover:bg-red-500 hover:text-white transition-all uppercase">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}