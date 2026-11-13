'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Cargar tarjetas guardadas al iniciar
  useEffect(() => {
    const defaultInitialCards = [
      {
        id: '1',
        brand: 'VISA',
        last4: '4567',
        holder: "Michael O'Brien",
        expiry: '08/27',
        isDefault: true
      }
    ];

    const storedCards = JSON.parse(localStorage.getItem('payment_cards') || JSON.stringify(defaultInitialCards));
    setCards(storedCards);
  }, []);

  // Agregar nueva tarjeta
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiry) {
      alert('Por favor completa los campos obligatorios de la tarjeta.');
      return;
    }

    const last4 = cardNumber.slice(-4) || '1234';
    const newCard = {
      id: 'card_' + Date.now(),
      brand: cardNumber.startsWith('4') ? 'VISA' : 'MASTERCARD',
      last4,
      holder: cardHolder,
      expiry,
      isDefault: cards.length === 0
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('payment_cards', JSON.stringify(updatedCards));

    // Limpiar formulario
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvc('');
    alert('¡Tarjeta agregada con éxito!');
  };

  // Eliminar tarjeta
  const handleDeleteCard = (id: string) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('payment_cards', JSON.stringify(updatedCards));
  };

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

      <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-gray-900 pb-4">
          <Link href="/profile" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
            ‹
          </Link>
          <div className="text-center">
            <h1 className="text-base font-extrabold text-white">Payment Methods</h1>
            <p className="text-[10px] text-gray-400">{cards.length} card{cards.length === 1 ? '' : 's'} saved</p>
          </div>
          <div className="w-9" />
        </div>

        {/* LISTA DE TARJETAS GUARDADAS */}
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="relative bg-gradient-to-br from-[#1E1E1E] to-[#121212] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6">
              
              {/* Botón de eliminar */}
              <button 
                onClick={() => handleDeleteCard(card.id)}
                className="absolute top-4 right-4 w-7 h-7 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs border border-red-500/30 transition cursor-pointer"
                title="Eliminar tarjeta"
              >
                ✕
              </button>

              <div className="flex justify-between items-start">
                <span className="font-black text-sm tracking-widest text-amber-400">{card.brand}</span>
                {card.isDefault && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mr-6">
                    Default
                  </span>
                )}
              </div>

              <div className="text-lg font-mono tracking-widest text-gray-200">
                •••• •••• •••• {card.last4}
              </div>

              <div className="flex justify-between items-end text-xs pt-2">
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Cardholder Name</span>
                  <span className="font-bold text-gray-300">{card.holder}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Expires</span>
                  <span className="font-bold text-gray-300">{card.expiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORMULARIO PARA AGREGAR NUEVA TARJETA */}
        <form onSubmit={handleAddCard} className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Add New Card</h3>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Card Number</label>
            <input 
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Cardholder Name</label>
            <input 
              type="text"
              placeholder="Full name on card"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
              className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Expiry</label>
              <input 
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner text-center font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">CVC</label>
              <input 
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
                className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner text-center font-mono"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/profile" className="flex-1 bg-[#121212] hover:bg-gray-800 border border-gray-800 text-gray-300 py-4 rounded-2xl text-xs font-bold flex items-center justify-center transition">
              Cancel
            </Link>
            <button 
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Add Card
            </button>
          </div>
        </form>

      </main>

    </div>
  );
}