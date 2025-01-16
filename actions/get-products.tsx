import { Pet } from '@/types';
import axios from 'axios';

export const getProducts = async (): Promise<Pet[]> => {
  const response = await axios.get(
    "https://petstore.swagger.io/v2/pet/findByStatus",
    { params: { status: "Disponible" } }
  );

  // Transformar los datos para que category sea un string
  const transformedData: Pet[] = response.data.map((pet: any) => ({
    id: pet.id,
    name: pet.name,
    category: {
      id: pet.category?.id || 0,
      name: pet.category?.name || 'Sin categoría',
    },
    photoUrl: pet.photoUrls[0] || '', // Usa la primera URL si está disponible
  }));

  return transformedData;
};
