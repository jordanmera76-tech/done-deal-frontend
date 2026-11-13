'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'reviews' | 'account'>('account');
  const [savedCount, setSavedCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(0);
  const [myListingsCount, setMyListingsCount] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    setUser(currentUser);

    const saved = JSON.parse(localStorage.getItem('saved_items') || '[]');
    setSavedCount(saved.length);

    const cards = JSON.parse(localStorage.getItem('payment_cards') || '[]');
    setCardsCount(cards.length);

    const localProds = JSON.parse(localStorage.getItem('local_products') || '[]');
    setMyListingsCount(localProds.length > 0 ? localProds.length : 2);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
    alert('Sesión cerrada con éxito.');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 font-sans">
      
      {/* 1. HEADER DE COMPUTADORA */}
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

      {/* 2. CONTENIDO PRINCIPAL */}
      {!user ? (
        /* VISTA DE INVITADO / LOGIN REQUERIDO */
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-3xl">
            👤
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-white">Inicia sesión en DoneDeal</h1>
            <p className="text-xs text-gray-400">Accede a tu perfil, artículos guardados, métodos de pago y gestiona tus publicaciones.</p>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Link href="/auth/signin" className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3.5 rounded-2xl font-extrabold text-xs transition shadow-lg flex items-center justify-center">
              Iniciar Sesión
            </Link>
            <Link href="/auth/signup" className="flex-1 bg-[#1E1E1E] hover:bg-gray-800 border border-gray-800 text-white py-3.5 rounded-2xl font-bold text-xs transition flex items-center justify-center">
              Registrarse
            </Link>
          </div>
        </div>
      ) : (
        /* VISTA CON SESIÓN ACTIVA */
        <>
          <div className="bg-gradient-to-b from-[#1a3a2a] via-[#121212] to-[#121212] px-6 pt-8 pb-6 border-b border-gray-900">
            <div className="max-w-md mx-auto space-y-4">
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-xl"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#121212]">
                    ✓
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-white">{user?.name}</h1>
                  <p className="text-[11px] text-gray-400 mt-0.5">member since March 2021</p>
                  <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
                    <span>★★★★★</span>
                    <span className="font-bold text-white text-xs ml-1">4.8</span>
                  </div>
                </div>
              </div>

              {/* ESTADÍSTICAS */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="bg-[#1E1E1E]/80 backdrop-blur border border-gray-800 rounded-2xl p-3 text-center shadow-lg">
                  <span className="block text-base font-black text-white">{myListingsCount}</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Listings</span>
                </div>
                <div className="bg-[#1E1E1E]/80 backdrop-blur border border-gray-800 rounded-2xl p-3 text-center shadow-lg">
                  <span className="block text-base font-black text-white">23</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Sold</span>
                </div>
                <div className="bg-[#1E1E1E]/80 backdrop-blur border border-gray-800 rounded-2xl p-3 text-center shadow-lg">
                  <span className="block text-base font-black text-white">23</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Reviews</span>
                </div>
                <div className="bg-[#1E1E1E]/80 backdrop-blur border border-gray-800 rounded-2xl p-3 text-center shadow-lg">
                  <span className="block text-base font-black text-emerald-400">4.8</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Rating</span>
                </div>
              </div>

              {/* PESTAÑAS (REVIEWS / ACCOUNT) */}
              <div className="bg-[#1E1E1E] border border-gray-800 p-1.5 rounded-2xl grid grid-cols-2 gap-1 shadow-inner mt-4">
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center ${activeTab === 'reviews' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Reviews
                </button>
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center ${activeTab === 'account' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Account
                </button>
              </div>

            </div>
          </div>

          <main className="max-w-md mx-auto px-4 py-6 space-y-4">
            {activeTab === 'account' ? (
              <>
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-3 shadow-xl space-y-1">
                  
                  <Link href="/profile/listings" className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-center text-sm">📋</div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">My Listings</h3>
                        <p className="text-[10px] text-gray-400">{myListingsCount} active</p>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white">›</span>
                  </Link>

                  <Link href="/profile/saved" className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-center text-sm">❤️</div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Saved Items</h3>
                        <p className="text-[10px] text-gray-400">{savedCount} items</p>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white">›</span>
                  </Link>

                  <Link href="/profile/payment" className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-center text-sm">💳</div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Payment Methods</h3>
                        <p className="text-[10px] text-gray-400">{cardsCount > 0 ? `${cardsCount} card(s) saved` : 'Visa ending 4567'}</p>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white">›</span>
                  </Link>

                  {/* ENLACE A SETTINGS */}
                  <Link href="/profile/settings" className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-center text-sm">⚙️</div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Settings</h3>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white">›</span>
                  </Link>

                  {/* ENLACE A HELP & SUPPORT */}
                  <Link href="/profile/support" className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-center text-sm">❓</div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Help & Support</h3>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white">›</span>
                  </Link>

                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full bg-[#1E1E1E] hover:bg-red-500/10 text-red-500 border border-red-500/30 py-4 rounded-3xl font-extrabold text-xs transition cursor-pointer shadow-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-black text-white">4.8</span>
                      <div className="text-emerald-400 text-xs mt-0.5">★★★★★</div>
                      <span className="text-[10px] text-gray-400">23 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {/* 3. BARRA INFERIOR MÓVIL */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <Link href="/home" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/home" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">🔍</span>
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        <Link href="/products/new" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          +
        </Link>
        <Link href="/messages" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 relative">
          <span className="text-lg">💬</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px] font-medium">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-emerald-400 gap-1">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium text-emerald-400">Profile</span>
        </Link>
      </nav>

    </div>
  );
}