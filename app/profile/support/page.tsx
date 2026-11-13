'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I list an item for sale?",
      answer: "Haz clic en el botón '+' en la barra de navegación para rellenar los detalles del artículo, subir fotos y publicarlo al instante en el catálogo de DoneDeal."
    },
    {
      question: "How does payment work?",
      answer: "Puedes agregar y gestionar tus tarjetas de crédito o débito de forma segura desde los métodos de pago en tu perfil para completar tus transacciones."
    },
    {
      question: "How do I verify my account?",
      answer: "Tu cuenta se verifica automáticamente al completar el registro con un correo electrónico válido y mantener una excelente reputación en la plataforma."
    },
    {
      question: "What if an item doesn't arrive or is not as described?",
      answer: "Puedes comunicarte directamente con el vendedor a través del chat de mensajes o reportar el caso a nuestro equipo de soporte técnico para recibir asistencia y mediación."
    },
    {
      question: "Can I edit or delete my listing?",
      answer: "Sí, puedes ver y administrar tus publicaciones activas ingresando a la sección 'My Listings' dentro de tu panel de perfil."
    },
    {
      question: "How do I block someone?",
      answer: "Por motivos de seguridad y privacidad, puedes bloquear a cualquier usuario directamente desde la ventana de chat o mensajería privada."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-900 px-6 py-4 flex items-center justify-between">
        <Link href="/profile" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
          ‹
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-extrabold text-white tracking-wider">Help & Support</h1>
          <p className="text-[10px] text-gray-400">Frequently asked questions</p>
        </div>
        <div className="w-9" />
      </header>

      {/* LISTA DE PREGUNTAS FRECUENTES (FAQ) */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              onClick={() => toggleAccordion(index)}
              className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-5 cursor-pointer shadow-xl transition hover:border-emerald-500/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white pr-4">{faq.question}</h3>
                <span className={`text-emerald-400 text-xs font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </div>
              
              {isOpen && (
                <p className="text-[11px] text-gray-300 leading-relaxed pt-2 border-t border-gray-800/80 animate-fadeIn">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </main>

    </div>
  );
}