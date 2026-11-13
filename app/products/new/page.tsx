'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [storage, setStorage] = useState('');
  const [colour, setColour] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalImage = imagePreview || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

    const newProduct = {
      _id: 'prod_' + Date.now(),
      title,
      price: Number(price),
      category,
      storage: category === 'Electronics' ? storage : undefined,
      colour: category === 'Electronics' ? colour : undefined,
      description,
      image: finalImage,
      images: [finalImage, finalImage, finalImage],
      condition: 'Like New',
      location: 'Cali, Colombia',
      timeAgo: 'Just now',
      views: 1
    };

    // 1. Guardado inmediato en localStorage para visualización instantánea garantizada
    const existingLocal = JSON.parse(localStorage.getItem('local_products') || '[]');
    localStorage.setItem('local_products', JSON.stringify([newProduct, ...existingLocal]));

    // 2. Intento de envío al backend de NestJS
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
    } catch (err) {
      console.log('Backend offline, usando almacenamiento local.');
    }

    setLoading(false);
    alert('¡Producto publicado con éxito!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 md:pb-12 font-sans">
      
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between border-b border-gray-900 mb-6">
        <Link href="/home" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
          ‹
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-extrabold text-white">List an Item</h1>
          <p className="text-[10px] text-gray-400">Sell locally in minutes</p>
        </div>
        <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">FREE</span>
      </div>

      <main className="max-w-xl mx-auto px-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Photos</span>
              <span className="text-[10px] text-gray-500">{imagePreview ? '1' : '0'}/6</span>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="h-52 w-full border-2 border-dashed border-emerald-500/40 hover:border-emerald-500 bg-[#1E1E1E] rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition relative shadow-lg group"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl mb-2 group-hover:scale-110 transition">
                    📷
                  </div>
                  <span className="text-xs font-bold text-white mb-1">Add cover photo</span>
                  <span className="text-[10px] text-gray-400">Tap to change</span>
                </>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {[2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num} 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-16 bg-[#1E1E1E] border border-gray-800 hover:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer text-gray-500 text-[10px] font-medium transition"
                >
                  <span>+</span>
                  <span>Photo {num}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1E1E1E] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
              >
                <option value="Electronics">Electronics</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Garden">Home & Garden</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Title</label>
              <input 
                type="text"
                placeholder="e.g. iPhone 15 Pro Max"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[#1E1E1E] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Price</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-400 font-bold text-xs">€</span>
                <input 
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full bg-[#1E1E1E] text-xs text-gray-200 pl-9 pr-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
                />
              </div>
            </div>

            {category === 'Electronics' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mb-1.5">Storage</label>
                  <input 
                    type="text"
                    placeholder="e.g. 128GB"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="w-full bg-[#1E1E1E] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mb-1.5">Colour</label>
                  <input 
                    type="text"
                    placeholder="e.g. Space Black"
                    value={colour}
                    onChange={(e) => setColour(e.target.value)}
                    className="w-full bg-[#1E1E1E] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#1E1E1E] text-xs text-gray-200 p-4 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition resize-none shadow-inner"
              />
            </div>

          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer mb-12"
          >
            {loading ? 'Publicando...' : 'Publish Listing'}
          </button>

        </form>
      </main>

    </div>
  );
}