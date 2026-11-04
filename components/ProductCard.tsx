import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category?: string;
}

export default function ProductCard({ id, title, price, category }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="bg-[#1E1E1E] border border-gray-800/80 rounded-2xl p-3 transition group-hover:border-emerald-500/50 shadow-lg relative">
        {/* Contenedor de la imagen y badges */}
        <div className="h-36 bg-gray-900 rounded-xl flex items-center justify-center text-gray-500 mb-3 relative overflow-hidden">
          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
            Like New
          </span>
          <button className="absolute top-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-gray-300 hover:text-white">
            ♡
          </button>
          <span className="text-xs text-gray-600">No image</span>
        </div>

        {/* Título y Precio */}
        <h3 className="font-semibold text-white text-sm truncate group-hover:text-emerald-400 transition">{title}</h3>
        <p className="text-emerald-400 font-extrabold text-base mt-0.5">€{price}</p>

        {/* Categoría y tiempo */}
        <div className="flex justify-between items-center mt-2 text-[11px] text-gray-400">
          <span>{category || 'General'}</span>
          <span>2h ago</span>
        </div>
      </div>
    </Link>
  );
}