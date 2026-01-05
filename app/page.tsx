"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white" style={{backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0)', backgroundSize: '40px 40px'}}>
      {/* Massive Leslie Signature */}
      <nav className="p-10 border-b border-cyan-500/30 bg-black/90 backdrop-blur-xl sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">TECHTONIC <span className="text-cyan-400">SHOP</span></h1>
        <div className="text-center md:text-right mt-4 md:mt-0 border-l-4 border-cyan-500 pl-6">
          <p className="text-sm font-bold tracking-[0.5em] text-cyan-500 uppercase">SYSTEMS BY</p>
          <p className="text-5xl md:text-6xl font-black italic tracking-widest uppercase">LESLIE</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p: any) => (
          <div key={p._id} className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/10 group hover:border-cyan-400 transition-all shadow-2xl">
            {/* 100% Clear Image Area */}
            <div className="aspect-square w-full overflow-hidden">
              <img src={p.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
            </div>
            {/* Dedicated Text Panel (Below Image) */}
            <div className="p-8 bg-gradient-to-b from-slate-900 to-black">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight flex-1 pr-4 leading-tight">{p.name}</h2>
                <span className="text-3xl font-black text-cyan-400">₱{p.price}</span>
              </div>
              <a href={p.shopeeLink} target="_blank" className="block w-full bg-white text-black text-center py-5 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all uppercase">Check Out</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}