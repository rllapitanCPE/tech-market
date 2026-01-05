"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  // Added <any[]> to fix the VS Code error
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const refresh = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { refresh(); }, []);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Uses PUT if editing, POST if new
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/products', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(isEditing ? "ITEM UPDATED" : "ITEM DEPLOYED");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      refresh();
    }
    setLoading(false);
  };

  // The missing function to make the Delete button work
  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this item?")) {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) refresh();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <form onSubmit={handleDeploy} className="max-w-4xl mx-auto space-y-4 mb-20 bg-zinc-900/20 p-8 rounded-3xl border border-white/5">
        <h2 className="text-cyan-500 font-bold uppercase">{isEditing ? "Edit Mode Active" : "Add New Item"}</h2>
        <input className="w-full bg-black border border-white/10 p-4 rounded-xl" placeholder="NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="w-full bg-black border border-white/10 p-4 rounded-xl" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input className="w-full bg-black border border-white/10 p-4 rounded-xl" placeholder="SHOPEE LINK" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
        <input className="w-full bg-black border border-white/10 p-4 rounded-xl" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
        
        <button type="submit" disabled={loading} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-white transition-all uppercase">
          {loading ? "SYNCING..." : isEditing ? "SAVE CHANGES" : "DEPLOY TO MARKET"}
        </button>
      </form>

      <div className="max-w-4xl mx-auto space-y-4">
        {products.map((p) => (
          <div key={p._id} className="flex justify-between items-center bg-zinc-900 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-xl">
            <span className="font-bold uppercase truncate pr-4">{p.name}</span>
            <div className="flex gap-4">
              {/* EDIT BUTTON: Fills the form and flips isEditing to true */}
              <button onClick={() => { setForm(p); setIsEditing(true); window.scrollTo(0,0); }} className="text-cyan-400 font-bold hover:underline">EDIT</button>
              {/* DELETE BUTTON: Now connected to handleDelete */}
              <button onClick={() => handleDelete(p._id)} className="text-red-500 font-bold hover:underline">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}