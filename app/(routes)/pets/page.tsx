"use client";

import { useEffect, useState } from "react";
import { PetsClient } from "./components/client"; // Componente para renderizar las mascotas
import { PetsColumn } from "./components/columns"; // Interfaz de las columnas de mascotas
import axios from "axios";

const PetsPage = () => {
  const [pets, setPets] = useState<PetsColumn[]>([]); // Estado para almacenar las mascotas
  const [loading, setLoading] = useState<boolean>(true); // Estado para la carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  useEffect(() => {
    const obtenerPets = async () => {
      try {
        const response = await axios.get(
          "https://petstore.swagger.io/v2/pet/findByStatus",
          { params: { status: "Disponible" } } // Consulta mascotas disponibles
        );
        setPets(response.data); // Actualiza el estado con las mascotas obtenidas
      } catch (err) {
        setError("Error al obtener las mascotas."); // Maneja errores
        console.error("Error al obtener pets:", err);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    obtenerPets(); // Llama a la función para obtener mascotas al montar el componente
  }, []);

  if (loading) return <p className="text-gray-800">Cargando mascotas...</p>; // Indicador de carga con texto oscuro
  if (error) return <p className="text-red-500">{error}</p>; // Mensaje de error en rojo

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PetsClient data={pets} />
        {/* Pasa los pets al componente PetsClient */}
      </div>
    </div>
  );
};

export default PetsPage;
