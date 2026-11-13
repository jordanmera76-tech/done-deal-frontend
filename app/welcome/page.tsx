'use client';

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col justify-between p-6 max-w-md mx-auto font-sans">
      
      {/* Indicador superior */}
      <div className="flex justify-center pt-2">
        <div className="w-12 h-1 bg-emerald-500 rounded-full" />
      </div>

      {/* Contenido Central */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        
        {/* Logo Icon */}
        <div className="w-20 h-20 bg-[#1E1E1E] border border-gray-800 rounded-3xl flex items-center justify-center shadow-2xl relative">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-xl" />
          <span className="text-3xl font-black text-emerald-400 relative z-10">D</span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">DoneDeal</h1>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            Ireland's favourite marketplace. Buy and sell locally with ease.
          </p>
        </div>

        {/* Lista de características */}
        <div className="w-full bg-[#1E1E1E]/60 border border-gray-800/80 rounded-3xl p-5 space-y-4 text-left shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">🔍</div>
            <span className="text-xs text-gray-300 font-medium">Browse thousands of local listings</span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">💬</div>
            <span className="text-xs text-gray-300 font-medium">Chat directly with sellers</span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">⭐</div>
            <span className="text-xs text-gray-300 font-medium">Verified sellers and safe transactions</span>
          </div>
        </div>

      </div>

      {/* Botones Inferiores */}
      <div className="space-y-3 pb-6">
        <Link 
          href="/" 
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs flex items-center justify-center transition shadow-lg shadow-emerald-500/20"
        >
          Start Exploring
        </Link>
        <Link 
          href="/auth/signup" 
          className="w-full bg-[#1E1E1E] hover:bg-gray-800 border border-gray-800 text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center transition shadow-md"
        >
          Create Account
        </Link>
        <div className="text-center pt-2">
          <span className="text-xs text-gray-400">Already have an account? </span>
          <Link href="/auth/signin" className="text-xs font-bold text-emerald-400 hover:underline">Sign in</Link>
        </div>
      </div>

    </div>
  );
}