'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setSavedItems(items);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 md:pb-12 font-sans">
      
      {/* NAVBAR DE ESCRITORIO */}
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
        <Link href="/home" className="text-xl font-extrabold text-emerald-400 tracking-wider">
          DONE DEAL
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>
          <Link href="/cart" className="text-gray-300 hover:text-white transition">Cart</Link>
          <Link href="/profile" className="text-emerald-400 font-bold">Profile</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-gray-900 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
              ‹
            </Link>
            <h1 className="text-lg font-extrabold text-white">Saved Items</h1>
          </div>
          <span className="text-xs text-gray-400 font-medium">{savedItems.length} items</span>
        </div>

        {savedItems.length === 0 ? (
          <div className="text-center py-24 space-y-4 bg-[#1E1E1E] border border-gray-800 rounded-3xl p-8 max-w-lg mx-auto shadow-xl">
            <span className="text-4xl">❤️</span>
            <h2 className="text-base font-bold text-white">No tienes artículos guardados</h2>
            <p className="text-xs text-gray-400 leading-relaxed">Explora el inicio y haz clic en el icono del corazón en cualquier producto para guardarlo aquí.</p>
            <Link href="/home" className="inline-block bg-emerald-500 text-black font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg mt-2">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedItems.map((product: any) => (
              <ProductCard
                key={product.id || product._id}
                id={product.id || product._id}
                title={product.title}
                price={product.price}
                category={product.category}
                image={product.image}
                condition={product.condition}
              />
            ))}
          </div>
        )}

      </main>

      {/* BARRA INFERIOR MÓVIL */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <Link href="/home" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-gray-400 hover:text-emerald-400 gap-1 relative">
          <span className="text-lg">🛒</span>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link href="/products/new" className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          +
        </Link>
        <Link href="/messages" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">💬</span>
          <span className="text-[10px] font-medium">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-emerald-400 gap-1">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

    </div>
  );
}