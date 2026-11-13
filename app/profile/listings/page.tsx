'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  timeAgo: string;
  views: number;
  image: string;
  status: 'active' | 'sold';
}

const mockListings: ListingItem[] = [
  { id: '1', title: 'iPhone 13 Pro 128GB', price: 599, condition: 'Like New', location: 'Dublin 2', timeAgo: '2h ago', views: 312, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80', status: 'active' },
  { id: '2', title: 'Sony WH-1000XM4 Headphones', price: 180, condition: 'Good', location: 'Cork City', timeAgo: '5h ago', views: 85, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80', status: 'active' },
  { id: '3', title: 'Nintendo Switch OLED', price: 240, condition: 'Like New', location: 'Galway', timeAgo: '1d ago', views: 138, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b12?w=300&auto=format&fit=crop&q=80', status: 'active' },
  { id: '4', title: 'Canon EOS 850D Camera', price: 540, condition: 'Like New', location: 'Dublin 4', timeAgo: '3d ago', views: 93, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80', status: 'sold' },
  { id: '5', title: 'IKEA Desk & Chair Set', price: 110, condition: 'Good', location: 'Limerick', timeAgo: '4d ago', views: 45, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&auto=format&fit=crop&q=80', status: 'sold' },
];

export default function MyListingsPage() {
  const [tab, setTab] = useState<'active' | 'sold'>('active');

  const filteredItems = mockListings.filter(item => item.status === tab);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 md:pb-12 font-sans">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-4 py-4 flex items-center justify-between max-w-xl mx-auto">
        <Link href="/profile" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
          ‹
        </Link>
        <div className="text-center">
          <h1 className="text-base font-extrabold tracking-tight text-white">My Listings</h1>
          <p className="text-[10px] text-gray-400">6 active · 2 sold</p>
        </div>
        <Link href="/products/new" className="w-9 h-9 bg-emerald-500 text-black font-extrabold rounded-full flex items-center justify-center text-lg hover:bg-emerald-400 transition">
          +
        </Link>
      </div>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-4">
        
        {/* Tabs Active / Sold */}
        <div className="bg-[#1E1E1E] border border-gray-800 p-1.5 rounded-2xl flex shadow-inner">
          <button 
            onClick={() => setTab('active')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${tab === 'active' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Active (6)
          </button>
          <button 
            onClick={() => setTab('sold')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${tab === 'sold' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Sold (2)
          </button>
        </div>

        {/* Lista de productos */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-md relative">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-gray-700 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-xs text-white truncate">{item.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                    {item.status === 'active' ? 'Active' : 'Sold'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{item.condition} · {item.location} · {item.timeAgo}</p>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-xs font-extrabold text-emerald-400">€{item.price}</span>
                  <span className="text-[10px] text-gray-500">👁 {item.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}