"use client";

import { useEffect, useState } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          ¿Seguro que quieres eliminar?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Esta acción no se puede deshacer.
        </p>

        {/* Modal Buttons */}
        <div className="pt-6 space-x-2 flex items-center justify-end">
          <button
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
