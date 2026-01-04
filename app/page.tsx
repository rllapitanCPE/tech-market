"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Tech Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p._id} className="bg-white p-4 rounded-lg shadow">
            <img src={p.image} className="h-40 w-full object-cover rounded" alt={p.name} />
            <h2 className="font-bold text-lg mt-2">{p.name}</h2>
            <p className="text-orange-500 font-bold">{p.price}</p>
            <a href={p.shopeeLink} target="_blank" className="block bg-orange-500 text-white text-center py-2 mt-4 rounded hover:bg-orange-600">
              Buy on Shopee
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}