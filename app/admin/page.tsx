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
      alert("SYNC SUCCESSFUL");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      refresh();
    } else {
      // Direct solution for the error in image_a944e3.png
      alert("SYNC ERROR: You must set MongoDB Network Access to 0.0.0.0/0");
    }
  };

  const deleteProd = (id: string) => {
    if (confirm("Delete this?")) {
      fetch(`/api/products?id=${id}`, { method: 'DELETE' }).then(() => refresh());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center border-b border-cyan-500/50 pb-6 mb-12">
          <h1 className="text-2xl font-black italic uppercase">TECHTONIC COMMAND</h1>
          <div className="bg-white text-black px-6 py-2 rounded-lg font-black text-xl italic uppercase">LESLIE</div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111] p-8 rounded-3xl border border-white/10 mb-12">
          <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none md:col-span-2" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-white transition-all uppercase">Deploy to Market</button>
        </form>

        <div className="space-y-4">
          <h2 className="text-cyan-500 font-bold tracking-widest uppercase text-sm">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-[#111] p-6 rounded-2xl border-l-4 border-cyan-500">
              <span className="font-bold truncate pr-4">{p.name}</span>
              <div className="flex gap-2">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="text-[10px] border border-cyan-500 text-cyan-500 px-4 py-2 rounded-md font-bold uppercase">Edit</button>
                <button onClick={() => deleteProd(p._id)} className="text-[10px] border border-red-500 text-red-500 px-4 py-2 rounded-md font-bold uppercase">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}