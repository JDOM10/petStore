"use client";

import { useState } from "react";
import { Pet } from "@/types";
import ImageModal from "@/components/modals/image-modal";
import { Expand } from "lucide-react";

interface ProductCardProps {
  data: Pet;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevenir navegación al hacer clic en expandir
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-white group cursor-pointer rounded-lg border p-3 space-y-2 w-full max-w-[300px] mx-auto">
        {/* Image Container */}
        <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              Sin imagen
            </div>
          )}
          {/* Expand Button */}
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-4 bottom-4">
            <div className="flex justify-center">
              <button
                onClick={handleExpandClick}
                className="bg-white p-2 rounded-full shadow-md"
              >
                <Expand size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Pet Information */}
        <div>
          <p className="font-semibold text-lg truncate">{data.name}</p>
          <p className="text-sm text-gray-500">{data.category}</p>
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={data.photoUrl}
      />
    </>
  );
};

export default ProductCard;
