import { Suspense } from 'react';
import { getProducts, Product } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function ProductsGrid() {
  const products: Product[] = await getProducts();

  return (
    <div className="px-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Recent Listings ({products.length})</h2>
        <span className="text-xs text-emerald-400 font-medium cursor-pointer hover:underline">See all</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28">
      {/* 1. Header con ubicación y perfil */}
      <header className="px-6 pt-4 pb-3 flex justify-between items-center border-b border-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-xs">📍</span>
          <span className="text-xs font-medium text-gray-300">Dublin, Ireland</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
          <span className="text-xs font-bold text-emerald-400">JM</span>
        </div>
      </header>

      {/* 2. Barra de búsqueda */}
      <div className="px-6 my-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="w-full bg-[#1E1E1E] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
            readOnly
          />
        </div>
      </div>

      {/* 3. Banner Destacado (Featured) */}
      <div className="px-6 my-4">
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#1E1E1E] to-[#1E1E1E] border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <span className="text-[10px] bg-emerald-500 text-black font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Featured
          </span>
          <h2 className="text-xl font-bold mt-2 text-white tracking-tight">MacBook Pro M2</h2>
          <p className="text-emerald-400 font-extrabold text-lg mt-0.5">€1,200</p>
          <p className="text-xs text-gray-400 mt-1">Galway • Like New</p>
          
          <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold px-5 py-2 rounded-xl transition shadow-md shadow-emerald-500/20">
            View
          </button>
        </div>
      </div>

      {/* 4. Categorías en formato píldora */}
      <div className="px-6 flex gap-2 overflow-x-auto py-2 no-scrollbar">
        <button className="px-4 py-2 bg-emerald-500 text-black font-semibold rounded-full text-xs whitespace-nowrap shadow-md shadow-emerald-500/20">
          ✨ All
        </button>
        <button className="px-4 py-2 bg-[#1E1E1E] text-gray-300 hover:text-white rounded-full text-xs whitespace-nowrap border border-gray-800 transition">
          💻 Electronics
        </button>
        <button className="px-4 py-2 bg-[#1E1E1E] text-gray-300 hover:text-white rounded-full text-xs whitespace-nowrap border border-gray-800 transition">
          🚗 Vehicles
        </button>
        <button className="px-4 py-2 bg-[#1E1E1E] text-gray-300 hover:text-white rounded-full text-xs whitespace-nowrap border border-gray-800 transition">
          👕 Fashion
        </button>
        <button className="px-4 py-2 bg-[#1E1E1E] text-gray-300 hover:text-white rounded-full text-xs whitespace-nowrap border border-gray-800 transition">
          🏠 Home
        </button>
      </div>

      {/* 5. Listado de productos desde MongoDB con Suspense */}
      <Suspense fallback={<div className="text-center text-emerald-400 py-10 text-sm">Cargando publicaciones...</div>}>
        <ProductsGrid />
      </Suspense>

      {/* 6. Barra de navegación inferior fija estilo app móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <button className="flex flex-col items-center text-emerald-400 gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition">
          <span className="text-lg">🔍</span>
          <span className="text-[10px] font-medium">Browse</span>
        </button>
        {/* Botón central flotante de Vender (+) */}
        
          <Link href="/products/new" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/30 transition transform hover:scale-105">
            +
          </Link>
        
        <button className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition relative">
          <span className="text-lg">💬</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px] font-medium">Messages</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}