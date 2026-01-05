"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white" style={{backgroundImage: 'radial-gradient(#1e293b 1px, transparent 0)', backgroundSize: '40px 40px'}}>
      {/* Premium Header */}
      <nav className="p-8 flex justify-between items-center border-b border-cyan-500/20 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div>
           <h1 className="text-4xl font-black italic tracking-tighter text-cyan-400">TECHTONIC</h1>
           <p className="text-[10px] tracking-[0.5em] text-slate-500 uppercase">Seismic Tech Solutions</p>
        </div>
        <div className="text-right border-l border-cyan-500/50 pl-6">
          <p className="text-xs font-medium text-slate-400">CURATED BY</p>
          <p className="font-black text-lg tracking-widest uppercase">LESLIE</p>
        </div>
      </nav>

      {/* Optimized Product Grid */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((p: any) => (
          <div key={p._id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10">
            {/* High-Impact Image Sizing (4:5 Ratio) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
              <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Price Badge with Auto-Peso */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full shadow-xl">
                 <span className="text-cyan-400 font-black text-xl">₱{p.price.replace(/[^\d.,]/g, '')}</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold tracking-tight mb-6 line-clamp-2 h-16 group-hover:text-cyan-400 transition-colors">{p.name}</h2>
              
              <a href={p.shopeeLink} target="_blank" className="relative group/btn flex items-center justify-center w-full bg-white text-black font-black py-4 rounded-xl transition-all hover:bg-cyan-400 overflow-hidden uppercase tracking-tighter text-lg">
                <span className="relative z-10 transition-colors group-hover/btn:text-black">Check Out</span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}