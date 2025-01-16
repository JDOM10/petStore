export interface Pet {
  id: number; // ID único de la mascota
  name: string; // Nombre de la mascota
  category: {
    id: number; // ID de la categoría
    name: string; // Nombre de la categoría (e.g., "Perro", "Gato")
  };
  photoUrl: string; // Array de URLs de imágenes
  status: string; // Estado actual de la mascota (e.g., "available", "pending", "sold")
}
