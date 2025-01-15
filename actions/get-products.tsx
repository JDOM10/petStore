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
    category: pet.category.name, // Asegúrate de tomar el nombre
    photoUrl: pet.photoUrls[0] || '', // Usa la primera URL si está disponible
  }));

  return transformedData;
};
