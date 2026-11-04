'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    storage: '',
    colour: '',
    description: '',
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...filesArray].slice(0, 6));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combinamos la descripción con los detalles adicionales si aplican
      const fullDescription = `${form.description} ${form.storage ? `| Storage: ${form.storage}` : ''} ${form.colour ? `| Colour: ${form.colour}` : ''}`.trim();

      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          category: form.category,
          description: fullDescription,
        }),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        alert('Hubo un error al guardar el producto');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 pb-32">
      {/* Encabezado superior */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white">
          ←
        </Link>
        <div className="text-center">
          <h1 className="text-base font-bold text-white tracking-tight">List an Item</h1>
          <p className="text-[11px] text-gray-400">Sell locally in minutes</p>
        </div>
        <span className="text-xs bg-emerald-950/80 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          FREE
        </span>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* SECCIÓN DE FOTOS */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Photos</label>
            <span className="text-xs text-gray-400">{images.length} / 6</span>
          </div>

          <label className="border-2 border-dashed border-emerald-500/60 bg-[#1E1E1E]/60 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition relative overflow-hidden group">
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
            {images.length > 0 ? (
              <img src={images[0]} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition">
                  📷
                </div>
                <span className="text-sm font-semibold text-emerald-400">Add cover photo</span>
                <span className="text-[11px] text-gray-500 mt-1">Tap to change</span>
              </>
            )}
          </label>

          <div className="grid grid-cols-5 gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <label key={index} className="border border-gray-800 bg-[#1E1E1E] rounded-xl h-16 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition relative overflow-hidden">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {images[index] ? (
                  <img src={images[index]} alt={`Photo ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-gray-400 text-xs font-bold">+</span>
                    <span className="text-[9px] text-gray-500 mt-0.5">Photo {index + 1}</span>
                  </>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* CATEGORÍA (Ubicada arriba para activar los campos dinámicos) */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#1E1E1E] text-sm text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="Electronics">Electronics</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
        </div>

        {/* TÍTULO */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-1.5">Title</label>
          <input 
            type="text" 
            required
            placeholder="e.g. iPhone 15 Pro Max"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-[#1E1E1E] text-sm text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* PRECIO */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-1.5">Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-400 font-bold">€</span>
            <input 
              type="number" 
              required
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full bg-[#1E1E1E] text-sm text-gray-200 pl-9 pr-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* CAMPOS CONDICIONALES: SE MUESTRAN SOLO SI ES ELECTRONICS */}
        {form.category === 'Electronics' && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#181818] rounded-2xl border border-emerald-500/30 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1.5">Storage</label>
              <input 
                type="text" 
                placeholder="e.g. 128GB"
                value={form.storage}
                onChange={(e) => setForm({ ...form, storage: e.target.value })}
                className="w-full bg-[#121212] text-sm text-gray-200 px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1.5">Colour</label>
              <input 
                type="text" 
                placeholder="e.g. Space Black"
                value={form.colour}
                onChange={(e) => setForm({ ...form, colour: e.target.value })}
                className="w-full bg-[#121212] text-sm text-gray-200 px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>
        )}

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-1.5">Description</label>
          <textarea 
            rows={4}
            placeholder="Describe your item..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#1E1E1E] text-sm text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition resize-none"
          />
        </div>

        {/* BOTÓN DE PUBLICACIÓN */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-4 rounded-2xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 text-base"
          >
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}