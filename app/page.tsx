"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)', backgroundSize: '24px 24px'}}>
      <nav className="p-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-4xl font-black italic tracking-tighter hover:text-cyan-500 transition-colors cursor-default">
          TECHTONIC <span className="text-cyan-500">SHOP</span>
        </h1>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Curated Systems</p>
          <p className="font-bold text-sm">BY LESLIE</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((p: any) => (
          <div key={p._id} className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black rounded-lg p-4 ring-1 ring-white/10">
              <img src={p.image} className="h-64 w-full object-cover rounded grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="mt-4 flex justify-between items-start">
                <h2 className="text-xl font-bold tracking-tight">{p.name}</h2>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/20">{p.price}</span>
              </div>
              <a href={p.shopeeLink} target="_blank" className="mt-6 block w-full bg-white text-black text-center py-3 font-black text-sm uppercase hover:bg-cyan-500 transition-colors">
                Acquire Plate
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}