"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const method = isEditing ? 'PUT' : 'POST';
    const response = await fetch('/api/products', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert(isEditing ? "DATABASE UPDATED" : "NEW UNIT DEPLOYED");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      fetchProducts();
    } else {
      alert("SYSTEM ERROR: Check Vercel Logs");
    }
    setLoading(false);
  };

  const startEdit = (p: any) => {
    setForm(p);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Execute deletion protocol? This cannot be undone.")) {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-cyan-400 p-4 md:p-10 font-mono">
      <div className="max-w-4xl mx-auto border border-cyan-500/20 bg-black/40 p-6 md:p-12 rounded-3xl backdrop-blur-md">
        <header className="flex justify-between items-center mb-10 border-b border-cyan-500/30 pb-6">
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter">TECHTONIC COMMAND</h1>
          <div className="bg-cyan-500 text-black px-4 py-1 text-xs font-black rounded tracking-widest uppercase">By Leslie</div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-16">
          <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-2">Unit Registration Terminal</p>
          <input className="bg-slate-900/50 border border-cyan-900 p-4 rounded-xl text-white focus:border-cyan-400 outline-none transition-all" 
            placeholder="UNIT NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="bg-slate-900/50 border border-cyan-900 p-4 rounded-xl text-white focus:border-cyan-400 outline-none transition-all" 
            placeholder="PRICE (EX: 1500)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input className="bg-slate-900/50 border border-cyan-900 p-4 rounded-xl text-white focus:border-cyan-400 outline-none transition-all" 
            placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
          <input className="bg-slate-900/50 border border-cyan-900 p-4 rounded-xl text-white focus:border-cyan-400 outline-none transition-all" 
            placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          
          <button disabled={loading} type="submit" className="bg-cyan-500 text-black font-black py-5 rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest mt-4">
            {loading ? "PROCESSING..." : isEditing ? "EXECUTE OVERWRITE" : "INITIALIZE DEPLOYMENT"}
          </button>
          
          {isEditing && (
            <button type="button" onClick={() => {setIsEditing(false); setForm({_id:'', name:'', price:'', image:'', shopeeLink:''})}} className="text-slate-500 text-xs hover:text-white transition-colors">CANCEL OPERATION</button>
          )}
        </form>

        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-[0.4em] text-slate-500 mb-6 uppercase">Active Inventory</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/30 border border-white/5 p-5 rounded-2xl hover:bg-slate-900/50 transition-all">
              <span className="font-bold text-slate-200 mb-4 md:mb-0">{p.name}</span>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => startEdit(p)} className="flex-1 md:flex-none text-[10px] bg-blue-500/10 px-6 py-2 rounded-lg border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white transition-all font-bold">EDIT</button>
                <button onClick={() => deleteProduct(p._id)} className="flex-1 md:flex-none text-[10px] bg-red-500/10 px-6 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}