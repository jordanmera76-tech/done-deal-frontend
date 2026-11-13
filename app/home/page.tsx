'use client';

import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiData = await getProducts();
        const localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
        const combined = [...localProducts, ...(Array.isArray(apiData) ? apiData : [])];
        setProducts(combined);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        const localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrado combinado por texto de búsqueda y categoría seleccionada
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 md:pb-12 font-sans">
      
      {/* NAVBAR DE ESCRITORIO */}
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
        <Link href="/home" className="text-xl font-extrabold text-emerald-400 tracking-wider">
          DONE DEAL
        </Link>
        
        <div className="flex-1 max-w-md mx-8 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
          <input 
            type="text"
            placeholder="Search for anything in Cali..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E1E1E] text-xs text-gray-200 pl-10 pr-4 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="text-emerald-400 font-bold">Home</Link>
          <Link href="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>
          <Link href="/cart" className="text-gray-300 hover:text-white transition flex items-center gap-1.5 relative">
            <span>🛒</span> Cart
          </Link>
          <Link href="/profile" className="text-gray-300 hover:text-white transition">Profile</Link>
          <Link href="/products/new" className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl font-bold text-xs shadow-lg">
            + Sell Item
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Banner Destacado */}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-6 md:p-8 mb-8 shadow-xl flex justify-between items-center">
          <div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured Deal</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3">MacBook Pro M2 - Like New</h1>
            <p className="text-emerald-400 font-bold text-xl mt-1">€1,200</p>
            <p className="text-xs text-gray-400 mt-2">Disponibles entregas presenciales en Cali y envíos seguros.</p>
          </div>
        </div>

        {/* Categorías Interactivas */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`font-bold text-xs px-5 py-2.5 rounded-full cursor-pointer flex-shrink-0 transition shadow ${selectedCategory === 'All' ? 'bg-emerald-500 text-black' : 'bg-[#1E1E1E] border border-gray-800 text-gray-300 hover:border-emerald-500'}`}
          >
            ✨ All Categories
          </button>
          <button 
            onClick={() => setSelectedCategory('Electronics')}
            className={`font-medium text-xs px-5 py-2.5 rounded-full cursor-pointer flex-shrink-0 transition shadow ${selectedCategory === 'Electronics' ? 'bg-emerald-500 text-black font-bold' : 'bg-[#1E1E1E] border border-gray-800 text-gray-300 hover:border-emerald-500'}`}
          >
            💻 Electronics
          </button>
          <button 
            onClick={() => setSelectedCategory('Vehicles')}
            className={`font-medium text-xs px-5 py-2.5 rounded-full cursor-pointer flex-shrink-0 transition shadow ${selectedCategory === 'Vehicles' ? 'bg-emerald-500 text-black font-bold' : 'bg-[#1E1E1E] border border-gray-800 text-gray-300 hover:border-emerald-500'}`}
          >
            🚗 Vehicles
          </button>
          <button 
            onClick={() => setSelectedCategory('Fashion')}
            className={`font-medium text-xs px-5 py-2.5 rounded-full cursor-pointer flex-shrink-0 transition shadow ${selectedCategory === 'Fashion' ? 'bg-emerald-500 text-black font-bold' : 'bg-[#1E1E1E] border border-gray-800 text-gray-300 hover:border-emerald-500'}`}
          >
            👕 Fashion
          </button>
          <button 
            onClick={() => setSelectedCategory('Home & Garden')}
            className={`font-medium text-xs px-5 py-2.5 rounded-full cursor-pointer flex-shrink-0 transition shadow ${selectedCategory === 'Home & Garden' ? 'bg-emerald-500 text-black font-bold' : 'bg-[#1E1E1E] border border-gray-800 text-gray-300 hover:border-emerald-500'}`}
          >
            🏠 Home & Garden
          </button>
        </div>

        {/* Cuadrícula de Productos */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Listings ({filteredProducts.length})</h2>
          </div>

          {loading ? (
            <p className="text-emerald-400 text-sm text-center py-20">Cargando productos...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-20">No se encontraron productos en esta categoría.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product: any) => (
                <ProductCard
                  key={product._id || product.id || Math.random()}
                  id={product._id || product.id || '1'}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  image={product.image || (product.images && product.images[0])}
                />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* BARRA INFERIOR MÓVIL */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <Link href="/home" className="flex flex-col items-center text-emerald-400 gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-gray-400 hover:text-emerald-400 gap-1 relative">
          <span className="text-lg">🛒</span>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link href="/products/new" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          +
        </Link>
        <Link href="/messages" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">💬</span>
          <span className="text-[10px] font-medium">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

    </div>
  );
}