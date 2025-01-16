"use client";

import { useEffect, useState } from "react";
import { PetsClient } from "./components/client"; // Componente para renderizar las mascotas
import { PetsColumn } from "./components/columns"; // Interfaz de las columnas de mascotas
import axios from "axios";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const PetsPage = () => {
  const [pets, setPets] = useState<PetsColumn[]>([]); // Estado para almacenar las mascotas
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [status, setStatus] = useState<string>("Disponible"); // Estado seleccionado (inicialmente "Disponible")

  const router = useRouter();
  // Función para obtener las mascotas filtradas por estado
  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    setPets([]); // Limpiar mascotas mientras carga

    try {
      const response = await axios.get<PetsColumn[]>(
        "https://petstore.swagger.io/v2/pet/findByStatus",
        { params: { status } } // Pasar el estado seleccionado como parámetro
      );
      setPets(response.data); // Guardar las mascotas en el estado
    } catch (err) {
      setError("Error al obtener las mascotas. Por favor, inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  // Llamar a la API cada vez que el estado cambie
  useEffect(() => {
    fetchPets();
  }, [status]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <Heading title={`Mascotas`} description="Administrar Mascotas" />
        <Button onClick={() => router.push(`pets/0`)}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>

      {/* Selector de estado */}
      <div className="mb-4 my-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Filtrar por estado:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="Disponible">Disponible</option>
          <option value="Pendiente">Pendiente</option>
          <option value="vendido">Vendido</option>
        </select>
      </div>

      {/* Mostrar mascotas */}
      <div className="mt-6">
        <PetsClient data={pets} />
        {/* Pasar las mascotas al componente PetsClient */}
      </div>
    </div>
  );
};

export default PetsPage;
