"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: "placed" | "approved" | "delivered";
  complete: boolean;
}

interface Pet {
  id: number;
  name: string;
}

const OrdersPage = () => {
  const [orderId, setOrderId] = useState<string>(""); // Estado para el ID de la orden ingresada
  const [order, setOrder] = useState<Order | null>(null); // Estado para la orden obtenida
  const [petName, setPetName] = useState<string | null>(null); // Nombre de la mascota
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
    setPetName(null);

    try {
      // Fetch order details
      const orderResponse = await axios.get<Order>(
        `https://petstore.swagger.io/v2/store/order/${orderId}`
      );
      setOrder(orderResponse.data);

      // Fetch pet name
      try {
        const petResponse = await axios.get<Pet>(
          `https://petstore.swagger.io/v2/pet/${orderResponse.data.petId}`
        );
        setPetName(petResponse.data.name);
      } catch {
        setPetName("Nombre de mascota no encontrado");
      }
    } catch (err) {
      setError("Error al obtener la orden. Verifica el ID ingresado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Consultar Orden</h1>
      <div className="mb-4">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Ingresa el ID de la orden"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={fetchOrder}
          disabled={!orderId || loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {loading ? "Buscando..." : "Buscar Orden"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {order && (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Detalles de la Orden</h2>
          <p><strong>ID de la Orden:</strong> {order.id}</p>
          <p><strong>Raza de la Mascota:</strong> {petName || "Cargando..."}</p>
          <p><strong>Cantidad:</strong> {order.quantity}</p>
          <p><strong>Fecha de Envío:</strong> {new Date(order.shipDate).toLocaleString()}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Completado:</strong> {order.complete ? "Sí" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
