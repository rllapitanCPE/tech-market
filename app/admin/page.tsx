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
      alert("SUCCESS: DATA SYNCED");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      refresh();
    } else {
      alert("ERROR: Check MongoDB IP Whitelist (0.0.0.0/0)");
    }
  };

  const deleteProd = async (id: string) => {
    if (confirm("Delete unit?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b-8 border-cyan-500 pb-10 mb-20">
          <h1 className="text-5xl font-black italic">COMMAND CENTER</h1>
          <div className="bg-white text-black px-10 py-6 rounded-3xl text-4xl font-black italic uppercase shadow-[0_0_50px_rgba(255,255,255,0.1)]">LESLIE</div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/20 p-12 rounded-[3.5rem] border-2 border-cyan-500/20 mb-20">
          <input className="bg-black border-2 border-slate-800 p-6 rounded-3xl focus:border-cyan-500 outline-none text-xl" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-6 rounded-3xl focus:border-cyan-500 outline-none text-xl" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-6 rounded-3xl focus:border-cyan-500 outline-none md:col-span-2 text-xl" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-black border-2 border-slate-800 p-6 rounded-3xl focus:border-cyan-500 outline-none md:col-span-2 text-xl" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          <button type="submit" className="md:col-span-2 bg-cyan-500 text-black font-black py-8 rounded-3xl text-3xl hover:bg-white transition-all uppercase">Deploy To Grid</button>
        </form>

        <div className="space-y-6">
          <h2 className="text-3xl font-black text-cyan-500 italic mb-8 uppercase underline underline-offset-8">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] p-10 rounded-[2.5rem] border-l-[16px] border-cyan-500 shadow-xl">
              <span className="text-2xl font-black italic uppercase tracking-tight mb-4 md:mb-0">{p.name}</span>
              <div className="flex gap-6">
                <button onClick={() => {setForm(p); setIsEditing(true); window.scrollTo(0,0);}} className="bg-cyan-500 text-black px-10 py-4 rounded-2xl font-black hover:bg-white transition-all">EDIT</button>
                <button onClick={() => deleteProd(p._id)} className="border-4 border-red-600 text-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}