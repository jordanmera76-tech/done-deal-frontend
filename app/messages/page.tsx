'use client';

import Link from 'next/link';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  item: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: "Michael O'Brien",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    item: 'Re: iPhone 13 Pro 128GB',
    lastMessage: 'Is the iPhone still available? I can collect...',
    time: '2m',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah Connolly',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    item: 'Re: MacBook Pro M2',
    lastMessage: 'Would you take €550 for it?',
    time: '1h',
    unread: 1,
    online: true,
  },
  {
    id: '3',
    name: 'James Fitzgerald',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    item: 'Re: Sony Headphones',
    lastMessage: "Thanks, I'll let you know.",
    time: '3h',
  },
  {
    id: '4',
    name: 'David Murphy',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    item: 'Re: Canon EOS 850D',
    lastMessage: 'Can you post to Limerick?',
    time: '1d',
  },
  {
    id: '5',
    name: 'Emma Walsh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    item: 'Re: AirPods Pro',
    lastMessage: 'Deal done! Great seller 👍',
    time: '2d',
  },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 md:pb-12 font-sans">
      
      {/* NAVBAR DE ESCRITORIO */}
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-emerald-400 tracking-wider">
          DONE DEAL
        </Link>
       <div className="flex items-center gap-6 text-sm font-medium">
  <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
  <Link href="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>
  <Link href="/cart" className="text-gray-300 hover:text-white transition flex items-center gap-1.5 relative">
    <span>🛒</span> Cart
    <span className="absolute -top-2 -right-3 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
  </Link>
  <Link href="/profile" className="text-gray-300 hover:text-white transition">Profile</Link>
  <Link href="/products/new" className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl font-bold text-xs shadow-lg">
    + Sell Item
  </Link>
</div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Messages</h1>
            <p className="text-xs text-emerald-400 font-medium mt-0.5">2 unread conversations</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-[#1E1E1E] text-xs text-gray-200 pl-10 pr-4 py-3 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Lista de Conversaciones */}
        <div className="space-y-3">
          {conversations.map((chat) => (
            <Link href={`/messages/${chat.id}`} key={chat.id} className="block group">
              <div className="bg-[#1E1E1E] border border-gray-800 group-hover:border-emerald-500/40 rounded-2xl p-4 flex items-center gap-4 transition cursor-pointer shadow-md">
                
                <div className="relative flex-shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-gray-700" />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1E1E1E] rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">{chat.name}</h3>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">{chat.item}</p>
                  <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread && (
                  <span className="w-5 h-5 bg-emerald-500 text-black font-extrabold text-[10px] rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}

              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* NAVBAR INFERIOR (Móvil) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-900 py-3 px-6 flex justify-around items-center z-50">
  <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-white gap-1">
    <span className="text-lg">🏠</span>
    <span className="text-[10px] font-medium">Home</span>
  </Link>
  
  {/* Botón de Cart en Móvil */}
  <Link href="/cart" className="flex flex-col items-center text-gray-400 hover:text-emerald-400 gap-1 relative">
    <span className="text-lg">🛒</span>
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
    <span className="text-[10px] font-medium">Cart</span>
  </Link>

  <Link href="/products/new" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
    +
  </Link>
  
  <Link href="/messages" className="flex flex-col items-center text-gray-400 hover:text-white gap-1 relative">
    <span className="text-lg">💬</span>
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
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