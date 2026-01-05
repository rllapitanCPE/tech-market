"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans" style={{backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0)', backgroundSize: '30px 30px'}}>
      <nav className="p-8 flex justify-between items-center border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0 z-50">
        <div>
           <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-cyan-400">TECHTONIC SHOP</h1>
           <p className="text-[15px] tracking-[0.6em] text-slate-500 uppercase ml-1">By Leslie • Seismic Systems</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p: any) => (
          <div key={p._id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:border-cyan-500/40">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex justify-between items-end">
                    <div className="flex-1 pr-4">
                       <h2 className="text-2xl font-black leading-none tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{p.name}</h2>
                    </div>
                    <div className="text-3xl font-black text-cyan-400">₱{p.price}</div>
                 </div>
              </div>
            </div>
            <div className="p-6 pt-0">
               <a href={p.shopeeLink} target="_blank" className="block w-full bg-white text-black font-black py-5 rounded-2xl text-center uppercase tracking-tighter text-lg hover:bg-cyan-500 transition-all active:scale-95">
                 Check Out
               </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}