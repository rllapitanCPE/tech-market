"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Techy Header */}
      <header className="border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            TECHTONIC SHOP
          </h1>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p: any) => (
            <div key={p._id} className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/10">
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <img src={p.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt={p.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="font-bold text-xl mb-2 text-slate-100 group-hover:text-cyan-400 transition-colors">{p.name}</h2>
                <p className="text-2xl font-black text-cyan-400 mb-4">{p.price}</p>
                
                <a href={p.shopeeLink} target="_blank" className="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden font-bold text-white rounded-lg bg-slate-800 group/btn">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-cyan-500 rounded-full group-hover/btn:w-full group-hover/btn:h-56"></span>
                  <span className="relative">DEPLOY TO SHOPEE</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}