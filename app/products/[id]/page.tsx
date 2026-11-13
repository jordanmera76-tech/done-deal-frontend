'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const localProducts = JSON.parse(localStorage.getItem('local_products') || '[]');
        const foundLocal = localProducts.find((p: any) => String(p._id) === String(id) || String(p.id) === String(id));

        if (foundLocal) {
          setProduct(foundLocal);
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/products/${id}`);
        if (res.ok) {
          const apiData = await res.json();
          setProduct(apiData);
        } else {
          setProduct({
            title: 'Producto de prueba',
            price: 50,
            category: 'Electronics',
            description: 'Sin descripción detallada.',
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80']
          });
        }
      } catch (err) {
        console.error('Error al cargar detalles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Función robusta para agregar al carrito
  const handleAddToCart = () => {
    if (!product) return;

    const productId = product._id || product.id || String(Date.now());
    const productTitle = product.title || 'Producto sin título';
    const productPrice = Number(product.price) || 0;
    const productCategory = product.category || 'General';
    
    const imagesList = product.images && product.images.length > 0 
      ? product.images 
      : [product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'];

    const cartItem = {
      id: productId,
      title: productTitle,
      price: productPrice,
      category: productCategory,
      storage: product.storage || '128GB',
      colour: product.colour || 'Space Black',
      image: imagesList[0],
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = existingCart.findIndex((item: any) => String(item.id) === String(cartItem.id));

    if (index > -1) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    console.log('Carrito actualizado:', existingCart);
    
    alert('¡Producto agregado al carrito con éxito!');
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center font-sans">
        <p className="text-emerald-400 text-sm">Cargando detalles...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center font-sans space-y-4">
        <p className="text-gray-400 text-sm">Producto no encontrado.</p>
        <Link href="/home" className="bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-28 md:pb-12 font-sans">
      
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
        <Link href="/home" className="text-xl font-extrabold text-emerald-400 tracking-wider">
          DONE DEAL
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>
          <Link href="/cart" className="text-emerald-400 font-bold flex items-center gap-1.5 relative">
            <span>🛒</span> Cart
          </Link>
          <Link href="/profile" className="text-gray-300 hover:text-white transition">Profile</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div>
          <Link href="/home" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-bold">
            ‹ Volver al inicio
          </Link>
        </div>

        <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-4 shadow-xl space-y-4">
          <div className="h-80 w-full rounded-2xl bg-black/50 overflow-hidden relative border border-gray-800">
            <img src={imagesList[activeImageIndex]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {imagesList.map((img: string, index: number) => (
              <button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${activeImageIndex === index ? 'border-emerald-500' : 'border-gray-800 opacity-60'}`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">{product.category}</span>
              <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1">{product.title}</h1>
            </div>
            <span className="text-2xl font-black text-emerald-400">€{product.price}</span>
          </div>
        </div>

        {(product.storage || product.colour) && (
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Especificaciones</h3>
            <div className="grid grid-cols-2 gap-3">
              {product.storage && (
                <div className="bg-[#121212] border border-gray-800 p-3 rounded-2xl">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Storage</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{product.storage}</span>
                </div>
              )}
              {product.colour && (
                <div className="bg-[#121212] border border-gray-800 p-3 rounded-2xl">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Colour</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{product.colour}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#1E1E1E] border border-gray-800 rounded-3xl p-5 space-y-2 shadow-xl">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Descripción</h3>
          <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
            {product.description || 'Sin descripción disponible para este artículo.'}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/messages" className="flex-1 bg-[#1E1E1E] hover:bg-gray-800 border border-gray-800 text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md">
            <span>💬</span> Message
          </Link>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>🛒</span> Add to Cart
          </button>
        </div>

      </main>

    </div>
  );
}