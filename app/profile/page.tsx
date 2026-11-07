'use client';

import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 max-w-md mx-auto my-6 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative font-sans">
      
      {/* HEADER / VOLVER */}
      <div className="px-6 pt-6 pb-2">
        <Link href="/" className="text-emerald-400 text-sm inline-block font-medium hover:underline">
          ← Volver al inicio
        </Link>
      </div>

      {/* INFORMACIÓN DEL USUARIO */}
      <div className="px-6 pt-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
              alt="Jordan Mera" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#121212] rounded-full flex items-center justify-center text-[10px] text-black font-bold">✓</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Jordan Mera</h1>
            <p className="text-[11px] text-gray-400">member since March 2025</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-emerald-400 text-xs">★★★★★</span>
              <span className="text-xs font-bold text-white">4.9</span>
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS (4 COLUMNAS) */}
        <div className="grid grid-cols-4 gap-2 bg-[#1E1E1E] border border-gray-800 rounded-2xl p-3 text-center mb-6 shadow-lg">
          <div>
            <p className="text-sm font-bold text-white">3</p>
            <p className="text-[10px] text-gray-400">Listings</p>
          </div>
          <div className="border-l border-gray-800">
            <p className="text-sm font-bold text-white">12</p>
            <p className="text-[10px] text-gray-400">Sold</p>
          </div>
          <div className="border-l border-gray-800">
            <p className="text-sm font-bold text-white">15</p>
            <p className="text-[10px] text-gray-400">Reviews</p>
          </div>
          <div className="border-l border-gray-800">
            <p className="text-sm font-bold text-white">4.9</p>
            <p className="text-[10px] text-gray-400">Rating</p>
          </div>
        </div>

        {/* PESTAÑAS (Reviews / Account) */}
        <div className="flex bg-[#1E1E1E] p-1 rounded-2xl border border-gray-800 mb-6">
          <button className="flex-1 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl shadow-md transition">
            Reviews
          </button>
          <button className="flex-1 py-2 text-gray-400 font-medium text-xs rounded-xl hover:text-white transition">
            Account
          </button>
        </div>

        {/* TARJETA DE RESUMEN DE CALIFICACIONES */}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-3xl font-extrabold text-white">4.9</span>
              <div className="text-emerald-400 text-xs mt-0.5">★★★★★</div>
              <p className="text-[10px] text-gray-400 mt-0.5">15 reviews</p>
            </div>
            <div className="space-y-1.5 text-[11px] text-gray-400 w-36">
              <div className="flex items-center gap-2">
                <span>5★</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>4★</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LISTA DE RESEÑAS DE COMPRADORES */}
        <div className="space-y-3 mb-6">
          <div className="bg-[#1E1E1E] border border-gray-800 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Carlos M." className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">Carlos M.</h4>
                  <div className="text-[10px] text-emerald-400">★★★★★</div>
                </div>
              </div>
              <span className="text-[10px] text-gray-500">Jul 2026</span>
            </div>
            <p className="text-xs text-gray-300">Excelente vendedor! El producto estaba exactamente como se describía. Súper recomendado.</p>
          </div>

          <div className="bg-[#1E1E1E] border border-gray-800 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Sofía R." className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">Sofía R.</h4>
                  <div className="text-[10px] text-emerald-400">★★★★★</div>
                </div>
              </div>
              <span className="text-[10px] text-gray-500">Jun 2026</span>
            </div>
            <p className="text-xs text-gray-300">Muy amable y puntual en la entrega. Todo perfecto 👍</p>
          </div>
        </div>

      </div>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 transition">
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
        
        <Link href="/profile" className="flex flex-col items-center text-emerald-400 gap-1 transition">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

    </div>
  );
}