"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', shopeeLink: '' });
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { refresh(); }, []);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("SYNC SUCCESSFUL: Product is Live");
        setForm({ name: '', price: '', image: '', shopeeLink: '' });
        refresh();
      } else {
        alert("CRITICAL ERROR: Check MongoDB Network Access (0.0.0.0/0)");
      }
    } catch (err) {
      alert("NETWORK ERROR: Server is not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="border-b-4 border-cyan-500 pb-6 mb-12 flex justify-between items-end">
          <h1 className="text-4xl font-black italic tracking-tighter">TECHTONIC COMMAND</h1>
          <div className="bg-white text-black px-6 py-2 rounded-lg font-black italic uppercase">LESLIE</div>
        </header>

        <form onSubmit={handleDeploy} className="space-y-4 bg-slate-900/20 p-8 rounded-[2rem] border border-cyan-500/30 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="PRODUCT NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input className="bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="PRICE (e.g. 500)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          </div>
          <input className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          
          <button type="submit" disabled={loading} className="w-full bg-cyan-500 text-black font-black py-5 rounded-xl text-xl hover:bg-white transition-all uppercase disabled:opacity-50">
            {loading ? "COMMUNICATING WITH DATABASE..." : "DEPLOY TO MARKET"}
          </button>
        </form>

        <div className="mt-16 space-y-4">
          <h2 className="text-cyan-500 font-bold tracking-widest uppercase">Live Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-[#0a0a0a] p-6 rounded-2xl border-l-4 border-cyan-500">
              <span className="font-bold uppercase truncate pr-4">{p.name}</span>
              <button onClick={() => fetch(`/api/products?id=${p._id}`,{method:'DELETE'}).then(()=>refresh())} className="text-red-500 font-bold hover:underline">REMOVE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}