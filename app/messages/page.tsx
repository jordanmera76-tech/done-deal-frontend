'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  content: string;
  createdAt?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consultamos al backend los mensajes del usuario con ID '1'
    fetch('http://localhost:3000/api/messages?userId=1')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch((err) => console.error('Error cargando mensajes:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 pb-24">
      {/* Botón para regresar al inicio */}
      <Link href="/" className="text-emerald-400 text-sm mb-6 inline-block hover:underline font-medium">
        ← Volver al inicio
      </Link>

      <h1 className="text-2xl font-bold mb-6 tracking-tight">Centro de Mensajes</h1>

      {loading ? (
        <p className="text-emerald-400 text-sm">Cargando conversaciones...</p>
      ) : messages.length === 0 ? (
        <div className="bg-[#1E1E1E] border border-gray-800 p-6 rounded-2xl text-center">
          <p className="text-gray-400 text-sm">No tienes mensajes nuevos por el momento.</p>
        </div>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-[#1E1E1E] border border-gray-800 p-4 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium">
                  Producto ID: {msg.productId}
                </span>
                <span className="text-[10px] text-gray-500">De: {msg.senderId}</span>
              </div>
              <p className="text-sm text-gray-200 mt-1">{msg.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}