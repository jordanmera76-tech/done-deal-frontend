'use client';

export const dynamic = 'force-dynamic'; // <--- Añade esta línea aquí

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Diccionario con la información de cada chat según su ID
const allChats: Record<string, { name: string; avatar: string; item: string; messages: { id: string; sender: 'them' | 'me'; text: string; time: string; }[] }> = {
  '1': {
    name: "Michael O'Brien",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    item: 'Re: iPhone 13 Pro 128GB',
    messages: [
      { id: '1', sender: 'them', text: 'Hi, is the iPhone still available?', time: '10:12' },
      { id: '2', sender: 'me', text: 'Yes, it is! Still in great condition.', time: '10:14' },
      { id: '3', sender: 'them', text: 'Is the iPhone still available? I can collect today.', time: '10:20' },
    ]
  },
  '2': {
    name: 'Sarah Connolly',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    item: 'Re: MacBook Pro M2',
    messages: [
      { id: '1', sender: 'them', text: 'Would you take €550 for it?', time: '12:00' },
    ]
  },
  '3': {
    name: 'James Fitzgerald',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    item: 'Re: Sony Headphones',
    messages: [
      { id: '1', sender: 'them', text: "Thanks, I'll let you know.", time: '14:30' },
    ]
  },
  '4': {
    name: 'David Murphy',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    item: 'Re: Canon EOS 850D',
    messages: [
      { id: '1', sender: 'them', text: 'Can you post to Limerick?', time: '16:00' },
    ]
  },
  '5': {
    name: 'Emma Walsh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    item: 'Re: AirPods Pro',
    messages: [
      { id: '1', sender: 'them', text: 'Deal done! Great seller 👍', time: '18:00' },
    ]
  }
};

export default function ChatDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '1';
  
  // Selecciona el chat correspondiente al ID de la URL (si no existe, usa el 1 por defecto)
  const chatData = allChats[id] || allChats['1'];

  const [messages, setMessages] = useState(chatData.messages);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'me', text: inputText, time: 'Now' }]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans">
      
      {/* 1. CABECERA DEL CHAT */}
      <div className="bg-[#121212] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
            ←
          </Link>
          <div className="relative">
            <img 
              src={chatData.avatar} 
              alt={chatData.name} 
              className="w-10 h-10 rounded-full object-cover border border-gray-700" 
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#121212] rounded-full"></span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{chatData.name}</h2>
            <p className="text-[10px] text-gray-400">{chatData.item}</p>
          </div>
        </div>
        <button className="w-8 h-8 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white text-xs font-bold">
          •••
        </button>
      </div>

      {/* 2. ÁREA DE MENSAJES */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-6 space-y-4 overflow-y-auto mb-20">
        
        {/* Banner del producto (Listing) */}
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl py-2.5 px-4 flex items-center gap-3 max-w-xs mx-auto shadow-md">
          <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
          <span className="text-xs text-gray-300">Listing: <strong className="text-white">{chatData.item.replace('Re: ', '')}</strong></span>
        </div>

        {/* Historial de mensajes */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 items-end ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.sender === 'them' && (
              <img 
                src={chatData.avatar} 
                alt="Avatar" 
                className="w-7 h-7 rounded-full object-cover mb-1 flex-shrink-0" 
              />
            )}

            <div className={`max-w-[75%] ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
              <div className={`p-3.5 rounded-2xl text-xs md:text-sm shadow-md ${
                msg.sender === 'me' 
                  ? 'bg-emerald-500 text-black font-medium rounded-br-none' 
                  : 'bg-[#1E1E1E] border border-gray-800 text-gray-200 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-gray-500 mt-1 inline-block px-1">{msg.time}</span>
            </div>

          </div>
        ))}

      </main>

      {/* 3. CAJA DE ENTRADA INFERIOR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 p-4">
        <form onSubmit={handleSend} className="max-w-xl mx-auto flex items-center gap-2">
          <input 
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#1E1E1E] text-xs md:text-sm text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
          />
          <button 
            type="submit" 
            className="w-11 h-11 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl flex items-center justify-center font-bold transition shadow-lg flex-shrink-0"
          >
            ➤
          </button>
        </form>
      </div>

    </div>
  );
}