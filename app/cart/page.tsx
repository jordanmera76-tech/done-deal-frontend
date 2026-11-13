'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'buy' | 'bid' | 'trade'>('buy');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Items leídos en el carrito:', storedCart);
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id: string | number, delta: number) => {
    const updated = cartItems.map(item => {
      if (String(item.id) === String(id)) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id: string | number) => {
    const updated = cartItems.filter(item => String(item.id) !== String(id));
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
  const serviceFee = Math.round(subtotal * 0.03);
  const total = subtotal + serviceFee;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 md:pb-12 font-sans">
      
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
        <Link href="/home" className="text-xl font-extrabold text-emerald-400 tracking-wider">
          DONE DEAL
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>
          <Link href="/cart" className="text-emerald-400 font-bold flex items-center gap-1.5 relative">
            <span>🛒</span> Cart
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-3 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </Link>
          <Link href="/profile" className="text-gray-300 hover:text-white transition">Profile</Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
        
        <div className="text-center space-y-1">
          <h1 className="text-lg font-extrabold text-white">Cart</h1>
          <p className="text-[11px] text-gray-400">{totalItemsCount} items</p>
        </div>

        <div className="bg-[#1E1E1E] border border-gray-800 p-1.5 rounded-2xl grid grid-cols-3 gap-1 shadow-inner">
          <button 
            onClick={() => setActiveTab('buy')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'buy' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <span>🛍️</span> Buy
          </button>
          <button 
            onClick={() => setActiveTab('bid')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'bid' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <span>⚡</span> Bid
          </button>
          <button 
            onClick={() => setActiveTab('trade')}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'trade' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <span>🔄</span> Trade
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-[#1E1E1E] border border-gray-800 rounded-3xl p-8">
            <span className="text-4xl">🛒</span>
            <p className="text-xs text-gray-400">Tu carrito está vacío.</p>
            <Link href="/home" className="inline-block bg-emerald-500 text-black font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg">
              Explorar productos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-4 shadow-xl space-y-4">
                  <div className="flex items-center gap-4 relative">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-2xl object-cover border border-gray-700 flex-shrink-0" />
                    <div className="flex-1 pr-6">
                      <h3 className="font-bold text-sm text-white">{item.title}</h3>
                      <p className="text-[10px] text-gray-400">{item.category} {item.storage ? `• ${item.storage}` : ''} {item.colour ? `• ${item.colour}` : ''}</p>
                      <p className="text-emerald-400 font-extrabold text-sm mt-1">€{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-0 right-0 w-7 h-7 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs border border-red-500/30 transition cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-800/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Quantity</span>
                    <div className="flex items-center gap-3 bg-[#121212] border border-gray-800 px-3 py-1.5 rounded-xl">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-white font-bold px-1.5 text-xs">-</button>
                      <span className="text-xs font-extrabold text-white">{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-white font-bold px-1.5 text-xs">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-5 space-y-3 shadow-xl">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-2">Order Summary</h3>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-gray-300">
                  <span className="truncate max-w-[220px]">{item.title} × {item.quantity || 1}</span>
                  <span className="font-bold text-white">€{item.price * (item.quantity || 1)}</span>
                </div>
              ))}

              <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                <span>Service fee (3%)</span>
                <span>€{serviceFee}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-white pt-3 border-t border-gray-800">
                <span>Total</span>
                <span className="text-emerald-400 text-lg">€{total}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
              <span className="text-xs text-emerald-400 font-medium">🔒 Payments are encrypted and processed securely.</span>
            </div>

            <button 
              onClick={() => { alert('¡Compra procesada con éxito!'); localStorage.removeItem('cart'); setCartItems([]); }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Proceed to Checkout · €{total}
            </button>
          </>
        )}

      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
        <Link href="/home" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center text-emerald-400 gap-1 relative">
          <span className="text-lg">🛒</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link href="/products/new" className="w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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