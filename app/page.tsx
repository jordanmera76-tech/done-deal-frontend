'use client';

import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargamos los productos del backend al iniciar la página
  useEffect(() => {
    getProducts()
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.error('Error al cargar productos:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filtramos los productos en tiempo real según lo que escribas en el buscador
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28">
      
      {/* 1. Header con ubicación y perfil */}
      <header className="px-6 pt-4 pb-3 flex justify-between items-center border-b border-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-xs">📍</span>
          <span className="text-xs font-medium text-gray-300">Cali, Colombia</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
          <span className="text-xs font-bold text-emerald-400">JM</span>
        </div>
      </header>

      {/* 2. Barra de búsqueda interactiva */}
      <div className="px-6 my-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">🔍</span>
          <input 
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E1E1E] text-sm text-gray-200 pl-11 pr-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* 3. Banner Destacado */}
      <div className="px-6 mb-6">
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured</span>
          <h2 className="text-xl font-bold text-white mt-2">MacBook Pro M2</h2>
          <p className="text-emerald-400 font-bold text-lg mt-0.5">€1,200</p>
          <p className="text-xs text-gray-400 mt-1">Galway • Like New</p>
        </div>
      </div>

      {/* 4. Categorías */}
      <div className="px-6 mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        <span className="bg-emerald-500 text-black font-bold text-xs px-4 py-2 rounded-full cursor-pointer">✨ All</span>
        <span className="bg-[#1E1E1E] border border-gray-800 text-gray-300 font-medium text-xs px-4 py-2 rounded-full cursor-pointer hover:border-emerald-500 transition">💻 Electronics</span>
        <span className="bg-[#1E1E1E] border border-gray-800 text-gray-300 font-medium text-xs px-4 py-2 rounded-full cursor-pointer hover:border-emerald-500 transition">🚗 Vehicles</span>
        <span className="bg-[#1E1E1E] border border-gray-800 text-gray-300 font-medium text-xs px-4 py-2 rounded-full cursor-pointer hover:border-emerald-500 transition">👕 Fashion</span>
      </div>

      {/* 5. Cuadrícula de Productos */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Recent Listings ({filteredProducts.length})</h2>
          <span className="text-xs text-emerald-400 font-medium cursor-pointer hover:underline">See all</span>
        </div>

        {loading ? (
          <p className="text-emerald-400 text-sm text-center py-10">Cargando productos...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>

      {/* 6. Barra de navegación inferior fija */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50 max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center text-emerald-400 gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition">
          <span className="text-lg">🔍</span>
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        
        <Link href="/products/new" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/30 transition transform hover:scale-105">
          +
        </Link>
        
        <Link href="/messages" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition relative">
          <span className="text-lg">💬</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px] font-medium">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

    </div>
  );
}