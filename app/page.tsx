"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500">
      {/* Sleek Professional Header */}
      <nav className="p-8 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">
          TECHTONIC <span className="text-cyan-400">SHOP</span>
        </h1>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">Curated Systems</p>
          <p className="text-xl font-black italic text-white uppercase tracking-wider">BY LESLIE</p>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((p: any) => (
          <div key={p._id} className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 group hover:border-cyan-500/50 transition-all shadow-2xl">
            {/* 100% CLEAR IMAGE AREA */}
            <div className="aspect-square bg-slate-900">
              <img src={p.image} className="h-full w-full object-cover" alt={p.name} />
            </div>
            
            {/* DATA PANEL BELOW IMAGE */}
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold leading-tight uppercase h-14 overflow-hidden">{p.name}</h2>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-2xl font-black text-cyan-400">₱{p.price}</span>
                <a href={p.shopeeLink} target="_blank" className="bg-white text-black px-6 py-2 rounded-xl font-black text-sm hover:bg-cyan-400 transition-all uppercase">Check Out</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}