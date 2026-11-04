const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';




export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images?: string[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.warn('El backend respondió con un estado no exitoso:', response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('No se pudo conectar con el backend:', error);
    return []; // Retorna vacío para que la UI cargue sin romperse
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('No se pudo conectar con el backend para obtener el producto:', error);
    return null;
  }
}

export async function createProduct(productData: { title: string; price: number; description?: string; category?: string }) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al crear el producto');
  return response.json();
}