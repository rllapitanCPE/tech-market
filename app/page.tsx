"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500 relative overflow-x-hidden">
      {/* RESTORED: THE SEISMIC GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'radial-gradient(#06b6d4 0.5px, transparent 0)', backgroundSize: '30px 30px'}}></div>

      {/* RESTORED: THE GLOWING HEADER */}
      <nav className="relative z-10 p-10 border-b border-cyan-500/20 bg-black/80 backdrop-blur-2xl sticky top-0 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          TECHTONIC <span className="text-cyan-400">SHOP</span>
        </h1>
        <div className="text-center md:text-right mt-6 md:mt-0 md:border-l-4 border-cyan-500 md:pl-8">
          <p className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase mb-1">CURATED SYSTEMS</p>
          <p className="text-4xl md:text-5xl font-black tracking-widest text-white italic drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">BY LESLIE</p>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {products.map((p: any) => (
          <div key={p._id} className="group bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] hover:border-cyan-500/50">
            
            {/* 100% CLEAR IMAGE AREA - NO TEXT OVERLAP */}
            <div className="relative aspect-square overflow-hidden bg-slate-900/50">
              <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
              <div className="absolute top-6 right-6">
                <div className="bg-black/90 backdrop-blur-xl border-2 border-cyan-500 px-5 py-2 rounded-2xl shadow-2xl">
                  <span className="text-cyan-400 font-black text-2xl">₱{p.price}</span>
                </div>
              </div>
            </div>

            {/* DATA PANEL BELOW IMAGE */}
            <div className="p-8 space-y-6 bg-gradient-to-b from-[#0f172a] to-black">
              <h2 className="text-xl md:text-2xl font-black leading-tight uppercase min-h-[4rem] group-hover:text-cyan-400 transition-colors">
                {p.name}
              </h2>
              <a href={p.shopeeLink} target="_blank" className="block w-full bg-white text-black font-black py-5 rounded-2xl text-center uppercase tracking-tighter text-xl hover:bg-cyan-500 hover:text-white transition-all transform group-hover:-translate-y-1 shadow-xl">
                CHECK OUT
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="relative z-10 p-20 text-center opacity-20">
        <p className="font-black text-2xl tracking-[1em]">TECHTONIC BY LESLIE</p>
      </footer>
    </main>
  );
}