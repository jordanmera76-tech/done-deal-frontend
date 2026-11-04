import { getProductById } from '@/services/productService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const instant = false;

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetails({ id }: { id: string }) {
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#1E1E1E] border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="h-64 bg-gray-900 rounded-xl flex items-center justify-center text-gray-500 mb-6 border border-gray-800">
        No image available
      </div>

      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium">
        {product.category || 'General'}
      </span>
      <h1 className="text-3xl font-bold mt-3 text-white tracking-tight">{product.title}</h1>
      
      <p className="text-3xl font-extrabold text-emerald-400 mt-2">€{product.price}</p>

      <div className="mt-6 border-t border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Descripción del producto</h3>
        <p className="text-gray-300 leading-relaxed">{product.description || 'Sin descripción disponible para este artículo.'}</p>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/10">
          Comprar / Contactar vendedor
        </button>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 pb-24">
      <Link href="/" className="text-emerald-400 text-sm mb-6 inline-block hover:underline font-medium">
        ← Volver al inicio
      </Link>

      <Suspense fallback={<div className="text-center text-emerald-400 py-10">Cargando detalles del producto...</div>}>
        <ProductDetails id={id} />
      </Suspense>
    </div>
  );
}