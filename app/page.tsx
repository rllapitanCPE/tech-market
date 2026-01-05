"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500" style={{backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0)', backgroundSize: '30px 30px'}}>
      {/* Bold Header Signature */}
      <nav className="p-10 flex flex-col md:flex-row justify-between items-center border-b border-cyan-500/20 bg-black/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="text-center md:text-left mb-4 md:mb-0">
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
            TECHTONIC <span className="text-cyan-500 underline decoration-white/20">SHOP</span>
           </h1>
        </div>
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l-4 border-cyan-500 pt-4 md:pt-0 md:pl-8">
          <p className="text-sm font-black tracking-[0.4em] text-cyan-500 uppercase">SYSTEMS BY</p>
          <p className="text-4xl md:text-5xl font-black tracking-widest text-white italic drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">LESLIE</p>
        </div>
      </nav>

      {/* Product Grid - No text overlapping image */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map((p: any) => (
          <div key={p._id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] hover:border-cyan-500/50">
            
            {/* Clear Image Area */}
            <div className="relative aspect-square overflow-hidden bg-slate-900">
              <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.name} />
              <div className="absolute top-6 right-6">
                 <div className="bg-black/80 backdrop-blur-xl border-2 border-cyan-500 px-6 py-2 rounded-2xl shadow-2xl">
                    <span className="text-cyan-400 font-black text-2xl">₱{p.price}</span>
                 </div>
              </div>
            </div>

            {/* Information Area (Below Image) */}
            <div className="p-8 space-y-6 bg-gradient-to-b from-[#0f172a] to-black">
               <h2 className="text-2xl font-black leading-tight tracking-tight uppercase min-h-[4rem] group-hover:text-cyan-400 transition-colors">
                {p.name}
               </h2>
               
               <a href={p.shopeeLink} target="_blank" className="block w-full bg-white text-black font-black py-5 rounded-2xl text-center uppercase tracking-tighter text-xl hover:bg-cyan-500 hover:text-white transition-all transform group-hover:translate-y-[-4px]">
                 CHECK OUT
               </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="p-20 text-center opacity-20">
        <p className="font-black text-2xl tracking-[1em]">TECHTONIC BY LESLIE</p>
      </footer>
    </main>
  );
}