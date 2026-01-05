"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 relative overflow-x-hidden">
      {/* RESTORED GRID */}
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'radial-gradient(#06b6d4 0.5px, transparent 0)', backgroundSize: '30px 30px'}}></div>

      {/* RESTORED HEADER */}
      <nav className="relative z-10 p-10 border-b border-white/10 bg-black/80 backdrop-blur-2xl sticky top-0 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase">
          TECHTONIC <span className="text-cyan-400">SHOP</span>
        </h1>
        <div className="text-center md:text-right mt-4 md:mt-0 border-l-4 border-cyan-500 pl-6">
          <p className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">CURATED SYSTEMS</p>
          <p className="text-3xl font-black tracking-widest text-white italic uppercase">BY LESLIE</p>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p: any) => (
          <div key={p._id} className="group bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] hover:border-cyan-500/50">
            <div className="aspect-square bg-slate-900/50 overflow-hidden">
              <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.name} />
            </div>
            <div className="p-8 bg-gradient-to-b from-[#0f172a] to-black">
              <h2 className="text-xl font-black uppercase mb-6 h-16 line-clamp-2 text-white group-hover:text-cyan-400 transition-colors">{p.name}</h2>
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-3xl font-black text-cyan-400">₱{p.price}</span>
                <a href={p.shopeeLink} target="_blank" className="bg-white text-black px-8 py-3 rounded-2xl font-black text-sm hover:bg-cyan-500 hover:text-white transition-all uppercase">Check Out</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}