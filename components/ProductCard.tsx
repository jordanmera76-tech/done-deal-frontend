'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  image?: string;
  images?: string[];
  condition?: string;
}

export default function ProductCard({ id, title, price, category, image, images, condition }: ProductCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const productImage = image || (images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80');

  useEffect(() => {
    // Verificamos si este producto ya está guardado en favoritos
    const saved = JSON.parse(localStorage.getItem('saved_items') || '[]');
    const exists = saved.some((item: any) => String(item.id || item._id) === String(id));
    setIsSaved(exists);
  }, [id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que se abra el detalle del producto al hacer clic en el corazón
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem('saved_items') || '[]');
    const productData = { id, title, price, category, image: productImage, condition };

    if (isSaved) {
      // Lo quitamos de favoritos
      const filtered = saved.filter((item: any) => String(item.id || item._id) !== String(id));
      localStorage.setItem('saved_items', JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      // Lo agregamos a favoritos
      saved.push(productData);
      localStorage.setItem('saved_items', JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  return (
    <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition flex flex-col group relative">
      
      {/* Botón de Favorito (Corazón) */}
      <button 
        onClick={toggleSave}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-sm transition hover:scale-110 cursor-pointer shadow-md"
        title={isSaved ? "Quitar de guardados" : "Guardar artículo"}
      >
        {isSaved ? '❤️' : '🤍'}
      </button>

      <Link href={`/products/${id}`} className="flex flex-col flex-1">
        <div className="h-48 w-full relative bg-black/40 overflow-hidden">
          <img 
            src={productImage} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {condition && (
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-700/50">
              {condition}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{category}</span>
            <h3 className="font-bold text-sm text-white truncate mt-1">{title}</h3>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800/80">
            <span className="text-sm font-extrabold text-emerald-400">€{price}</span>
            <span className="text-[10px] text-gray-500">2h ago</span>
          </div>
        </div>
      </Link>
    </div>
  );
}