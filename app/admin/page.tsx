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
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b-4 border-cyan-500 pb-8 mb-16">
          <h1 className="text-4xl font-black italic">TECHTONIC COMMAND</h1>
          <div className="bg-white text-black px-10 py-3 rounded-xl font-black text-2xl italic uppercase shadow-xl">LESLIE</div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/10 p-10 rounded-[2.5rem] border border-cyan-500/20 mb-12 shadow-2xl">
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none text-white" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none text-white" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-5 rounded-2xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-6 rounded-2xl text-2xl hover:bg-white transition-all uppercase">Deploy To Market</button>
        </form>

        <div className="space-y-6">
          <h2 className="text-cyan-500 font-bold tracking-widest uppercase">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-[#0a0a0a] p-8 rounded-3xl border-l-8 border-cyan-500 hover:bg-slate-900 transition-all shadow-xl">
              <span className="text-xl font-bold uppercase truncate pr-8">{p.name}</span>
              <div className="flex gap-4">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="bg-cyan-500 text-black px-8 py-2 rounded-xl font-bold">EDIT</button>
                <button onClick={() => {if(confirm("Delete?")) fetch(`/api/products?id=${p._id}`,{method:'DELETE'}).then(()=>refresh())}} className="border-2 border-red-600 text-red-600 px-8 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}