'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/get-products'; // Asegúrate de que esta ruta sea correcta
import { Pet } from '@/types';
import { ProductList } from '@/components/product-list';

const PetsPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getProducts();
        setPets(data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        setError('No se pudieron cargar las mascotas disponibles.');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <p className="text-gray-800">Cargando mascotas disponibles...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className="p-8 bg-center"
      style={{
        backgroundImage: "url('https://juandiegoosorio.neocities.org/images/mas5.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg">
        <ProductList title="Mascotas Disponibles" items={pets} />
      </div>
    </div>
  );
};

export default PetsPage;
