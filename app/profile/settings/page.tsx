'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    phone: '',
    location: '',
    avatar: ''
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    if (currentUser) {
      setUser({
        name: currentUser.name || "Michael O'Brien",
        email: currentUser.email || "michael@donedeal.com",
        phone: currentUser.phone || "+353 85 123 4567",
        location: currentUser.location || "Dublin, Ireland",
        avatar: currentUser.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
      });
    }
  }, []);

  const handleSaveField = (field: string) => {
    const updatedUser = { ...user, [field]: inputValue };
    setUser(updatedUser);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));

    // Actualizar también en la base de datos de usuarios registrados
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const updatedRegistered = registered.map((u: any) => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registered_users', JSON.stringify(updatedRegistered));

    setIsEditing(null);
    setInputValue('');
    alert('¡Información actualizada con éxito!');
  };

  const handleSignOut = () => {
    localStorage.removeItem('current_user');
    alert('Sesión cerrada con éxito.');
    router.push('/auth/signin');
  };

  const handleDeleteAccount = () => {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const filtered = registered.filter((u: any) => u.email !== user.email);
      localStorage.setItem('registered_users', JSON.stringify(filtered));
      localStorage.removeItem('current_user');
      alert('Cuenta eliminada con éxito.');
      router.push('/auth/signup');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-900 px-6 py-4 flex items-center justify-between">
        <Link href="/profile" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition">
          ‹
        </Link>
        <h1 className="text-sm font-extrabold text-white tracking-wider">Settings</h1>
        <div className="w-9" />
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        <div>
          <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mb-3 px-2">Account</h2>
          
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-3 shadow-xl space-y-1">
            
            {/* Edit Profile */}
            <div onClick={() => { setIsEditing('name'); setInputValue(user.name); }} className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Edit Profile</h3>
                <p className="text-[10px] text-gray-400">Name, photo, etc.</p>
              </div>
              <span className="text-gray-600 group-hover:text-white">›</span>
            </div>

            {/* Change Email */}
            <div onClick={() => { setIsEditing('email'); setInputValue(user.email); }} className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Change Email</h3>
                <p className="text-[10px] text-gray-400">{user.email}</p>
              </div>
              <span className="text-gray-600 group-hover:text-white">›</span>
            </div>

            {/* Change Password */}
            <div onClick={() => { setIsEditing('password'); setInputValue(''); }} className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Change Password</h3>
                <p className="text-[10px] text-gray-400">••••••••</p>
              </div>
              <span className="text-gray-600 group-hover:text-white">›</span>
            </div>

            {/* Phone Number */}
            <div onClick={() => { setIsEditing('phone'); setInputValue(user.phone); }} className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Phone Number</h3>
                <p className="text-[10px] text-gray-400">{user.phone}</p>
              </div>
              <span className="text-gray-600 group-hover:text-white">›</span>
            </div>

            {/* Location */}
            <div onClick={() => { setIsEditing('location'); setInputValue(user.location); }} className="flex items-center justify-between p-4 hover:bg-[#121212] rounded-2xl transition group cursor-pointer">
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Location</h3>
                <p className="text-[10px] text-gray-400">{user.location}</p>
              </div>
              <span className="text-gray-600 group-hover:text-white">›</span>
            </div>

          </div>
        </div>

        {/* MODAL FLOTANTE PARA EDITAR DATOS */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
              <h3 className="text-sm font-extrabold text-emerald-400 capitalize">Editar {isEditing}</h3>
              <input 
                type={isEditing === 'password' ? 'password' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-[#121212] text-xs text-gray-200 px-4 py-3.5 rounded-2xl border border-gray-800 focus:outline-none focus:border-emerald-500 transition"
                placeholder={`Nuevo valor`}
              />
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setIsEditing(null)}
                  className="flex-1 bg-[#121212] hover:bg-gray-800 text-gray-300 py-3 rounded-2xl text-xs font-bold transition border border-gray-800"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleSaveField(isEditing)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded-2xl text-xs font-extrabold transition shadow-lg cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTONES DE ACCIÓN */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={handleSignOut}
            className="w-full bg-[#1E1E1E] hover:bg-gray-800 border border-gray-800 text-white py-4 rounded-3xl font-extrabold text-xs transition cursor-pointer shadow-lg"
          >
            Sign Out
          </button>
          
          <button 
            onClick={handleDeleteAccount}
            className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-4 rounded-3xl font-extrabold text-xs transition cursor-pointer shadow-lg"
          >
            Delete Account
          </button>
        </div>

        {/* FOOTER VERSION */}
        <div className="text-center pt-4">
          <p className="text-[10px] text-gray-500 font-mono">DoneDeal v3.2.1 - Build 2026.09</p>
        </div>

      </main>

    </div>
  );
}