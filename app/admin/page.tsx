"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  // FIX: Added <any[]> to solve the 'never' error in your VS Code
  const [products, setProducts] = useState<any[]>([]);
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
    setLoading(true); // Disable button while saving
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("DATABASE SYNCED: Product is live!");
        setForm({ name: '', price: '', image: '', shopeeLink: '' });
        await refresh();
      } else {
        // This alerts you if MongoDB blocks the save
        alert("CRITICAL: MongoDB rejected the save. Check Network Access.");
      }
    } catch (err) {
      alert("NETWORK FAIL: Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="border-b-4 border-cyan-500 pb-4 mb-10 flex justify-between items-end">
          <h1 className="text-3xl font-black italic uppercase">TECHTONIC COMMAND</h1>
          <div className="bg-white text-black px-4 py-1 font-black">LESLIE</div>
        </header>

        <form onSubmit={handleDeploy} className="space-y-4 bg-zinc-900/30 p-8 rounded-3xl border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <input className="bg-black border border-white/20 p-4 rounded-xl" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input className="bg-black border border-white/20 p-4 rounded-xl" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          </div>
          <input className="w-full bg-black border border-white/20 p-4 rounded-xl" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="w-full bg-black border border-white/20 p-4 rounded-xl" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          
          <button type="submit" disabled={loading} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl text-xl hover:bg-white transition-all uppercase disabled:opacity-50">
            {loading ? "SAVING TO CLOUD..." : "DEPLOY TO MARKET"}
          </button>
        </form>

        <div className="mt-12 space-y-4">
          <h2 className="text-cyan-500 font-bold uppercase tracking-widest">Inventory List</h2>
          {products.map((p) => (
            <div key={p._id} className="flex justify-between items-center bg-zinc-900 p-6 rounded-2xl border-l-4 border-cyan-500">
              <span className="font-bold uppercase truncate pr-4">{p.name}</span>
              <button onClick={() => fetch(`/api/products?id=${p._id}`,{method:'DELETE'}).then(()=>refresh())} className="text-red-500 font-bold">DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}