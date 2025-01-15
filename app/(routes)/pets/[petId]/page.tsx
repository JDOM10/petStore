"use client";

import { PetsForm } from "@/app/(routes)/pets/[petId]/components/pets-form";

const PetsPageAdd = ({}) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PetsForm /> {}
      </div>
    </div>
  );
};

export default PetsPageAdd;
