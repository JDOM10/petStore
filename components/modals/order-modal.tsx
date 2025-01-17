"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: {
    id: number;
    name: string;
    category: {
      id: number; // ID de la categoría
      name: string; // Nombre de la categoría (e.g., "Perro", "Gato")
    };
    photoUrl: string;
    status: string; // Asegúrate de incluir el estado actual de la mascota
  };
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, pet }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  const generateOrderId = () => {
    return Math.floor(Math.random() * 10) + 1; // Generar un ID entre 1 y 10
  };

  const handleOrderSubmit = async () => {
    const orderId = generateOrderId();
    try {
      // Crear la orden
      await axios.post("https://petstore.swagger.io/v2/store/order", {
        id: orderId,
        petId: pet.id,
        quantity,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: false,
      });
      toast.success(`Orden realizada! # de orden: ${orderId}`);

       // Actualizar el estado de la mascota a "vendido"
    await axios.put("https://petstore.swagger.io/v2/pet", {
      id: pet.id,
      name: pet.name,
      category: {
        id: pet.category.id, // Ajusta según sea necesario
        name: pet.category.name,
      },
      photoUrls: [pet.photoUrl],
      status: "vendido", // Estado actualizado
    });

      onClose();
      router.push(`/orders`);
    } catch (error) {
      toast.error("Hubo un problema al realizar la orden.");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">¿Deseas ordenar esta mascota?</h2>
                  <div className="flex items-center mb-4">
                    <img
                      src={pet.photoUrl}
                      alt={pet.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <p className="font-semibold">{pet.name}</p>
                      <p className="text-sm text-gray-500">{pet.category.name}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Cantidad
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => {
                        const newValue = Math.max(1, Number(e.target.value)); // Garantizar que el valor mínimo sea 1
                        setQuantity(newValue);
                      }}
                      className="mt-1 block w-full border rounded-md p-2"
                    />

                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={onClose}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleOrderSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Confirmar Orden
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderModal;
