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
    const method = isEditing ? 'PUT' : 'POST';
    const response = await fetch('/api/products', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert("System Updated");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Permanently delete this unit from TechTonic?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-6 font-mono" style={{backgroundImage: 'linear-gradient(to right, #081216 1px, transparent 1px), linear-gradient(to bottom, #081216 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
      <div className="max-w-4xl mx-auto border-l border-r border-cyan-900/50 min-h-screen px-8">
        <div className="flex justify-between items-end mb-10 pt-10 border-b border-cyan-500 pb-4">
          <h1 className="text-4xl font-black italic">TECHTONIC COMMAND</h1>
          <p className="text-sm font-bold bg-cyan-950 px-3 py-1 border border-cyan-500 rounded">BY LESLIE</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-950 border border-cyan-500/30 p-6 rounded-sm mb-10 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <p className="text-xs uppercase mb-4 tracking-widest text-white">{isEditing ? "> Modifying Plate Data" : "> Initializing New Plate"}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="bg-black border border-cyan-900 p-3 outline-none focus:border-cyan-400 text-white" placeholder="PRODUCT NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input className="bg-black border border-cyan-900 p-3 outline-none focus:border-cyan-400 text-white" placeholder="PRICE" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <input className="bg-black border border-cyan-900 p-3 outline-none focus:border-cyan-400 text-white" placeholder="SHOPEE URL" value={form.shopeeLink} onChange={e => setForm({...form, shopeeLink: e.target.value})} required />
            <input className="bg-black border border-cyan-900 p-3 outline-none focus:border-cyan-400 text-white" placeholder="IMAGE URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          </div>
          <button type="submit" className="w-full mt-4 bg-cyan-500 text-black font-black py-3 hover:bg-white transition-colors">
            {isEditing ? "UPDATE RECORDS" : "DEPLOY TO DATABASE"}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold italic mb-6">PLATE INVENTORY</h2>
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-slate-950 border-l-4 border-cyan-700 p-4 hover:border-cyan-400 transition-all">
              <span className="font-bold tracking-widest">{p.name}</span>
              <div className="flex gap-4">
                <button onClick={() => {setForm(p); setIsEditing(true);}} className="text-xs border border-cyan-900 px-4 py-1 hover:bg-cyan-900 transition text-white">EDIT</button>
                <button onClick={() => deleteProduct(p._id)} className="text-xs border border-red-900 px-4 py-1 hover:bg-red-900 transition text-red-500">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}