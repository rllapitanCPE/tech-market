"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products to show in the "Edit" list
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
      alert(isEditing ? "Product Updated!" : "Product Added!");
      setForm({ _id: '', name: '', price: '', image: '', shopeeLink: '' });
      setIsEditing(false);
      fetchProducts();
    }
  };

  const startEdit = (p: any) => {
    setForm(p);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8 border-b border-cyan-900 pb-4">
          TECHTONIC COMMAND CENTER
        </h1>

        {/* Form Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            {isEditing ? "MODIFY UNIT" : "REGISTER NEW UNIT"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="bg-slate-800 border-slate-700 p-3 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none" 
              placeholder="Product Name" onChange={e => setForm({...form, name: e.target.value})} value={form.name} required />
            <input className="bg-slate-800 border-slate-700 p-3 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none" 
              placeholder="Price (e.g. ₱1,500)" onChange={e => setForm({...form, price: e.target.value})} value={form.price} required />
            <input className="bg-slate-800 border-slate-700 p-3 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none" 
              placeholder="Shopee Link" onChange={e => setForm({...form, shopeeLink: e.target.value})} value={form.shopeeLink} required />
            <input className="bg-slate-800 border-slate-700 p-3 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none" 
              placeholder="Image URL" onChange={e => setForm({...form, image: e.target.value})} value={form.image} required />
            <button type="submit" className="md:col-span-2 bg-gradient-to-r from-cyan-600 to-blue-700 p-3 rounded font-black hover:from-cyan-500 hover:to-blue-600 transition-all uppercase tracking-widest">
              {isEditing ? "Execute Update" : "Initialize Upload"}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setForm({_id:'', name:'', price:'', image:'', shopeeLink:''})}} 
                className="md:col-span-2 text-slate-400 underline text-sm">Cancel Edit</button>
            )}
          </form>
        </div>

        {/* Inventory List */}
        <h2 className="text-xl font-semibold mb-4 text-cyan-500">SYSTEM INVENTORY</h2>
        <div className="grid gap-4">
          {products.map((p: any) => (
            <div key={p._id} className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
              <div>
                <p className="font-bold text-slate-200">{p.name}</p>
                <p className="text-sm text-cyan-600">{p.price}</p>
              </div>
              <button onClick={() => startEdit(p)} className="bg-blue-900/30 text-blue-400 border border-blue-900 px-4 py-1 rounded hover:bg-blue-900 transition">
                EDIT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}