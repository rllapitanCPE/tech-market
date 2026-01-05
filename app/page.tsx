"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white" style={{backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0)', backgroundSize: '40px 40px'}}>
      <nav className="p-10 border-b-2 border-cyan-500 bg-black/90 backdrop-blur-xl sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">TECHTONIC</h1>
        <div className="text-center md:text-right border-l-8 border-cyan-500 pl-8 mt-4 md:mt-0">
          <p className="text-sm font-bold tracking-[0.6em] text-cyan-500 mb-2">CURATED BY</p>
          <p className="text-5xl md:text-7xl font-black italic tracking-widest uppercase">LESLIE</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map((p: any) => (
          <div key={p._id} className="bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden border border-white/10 group hover:border-cyan-400 transition-all shadow-2xl">
            <div className="aspect-square w-full overflow-hidden bg-slate-900">
              <img src={p.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-10 bg-black">
              <h2 className="text-2xl font-black uppercase mb-6 h-20 line-clamp-2 text-white group-hover:text-cyan-400">{p.name}</h2>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-4xl font-black text-cyan-400">₱{p.price}</span>
                <a href={p.shopeeLink} target="_blank" className="bg-white text-black px-10 py-4 rounded-2xl font-black text-xl hover:bg-cyan-500 transition-all uppercase">Check Out</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}