'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

    const emailExists = registeredUsers.some(
      (user: any) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      setError('Este correo electrónico ya está registrado. Por favor, usa otro o inicia sesión.');
      return;
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name,
      email: email.trim().toLowerCase(),
      password,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    localStorage.setItem('current_user', JSON.stringify(newUser));

    alert('¡Cuenta creada con éxito!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* Botón flotante para volver al inicio */}
      <div className="absolute top-6 left-6">
        <Link href="/home" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-bold bg-[#1E1E1E] border border-gray-800 px-4 py-2 rounded-xl transition">
          ← Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#1E1E1E] border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/home" className="inline-block text-2xl font-extrabold text-emerald-400 hover:opacity-80 transition">
            DONE DEAL
          </Link>
          <p className="text-xs text-gray-400">Crea una cuenta nueva para comenzar</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Nombre</label>
            <input 
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Correo Electrónico</label>
            <input 
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">Contraseña</label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer mt-2"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/signin" className="text-emerald-400 font-bold hover:underline">
            Inicia sesión
          </Link>
        </div>

      </div>
    </div>
  );
}