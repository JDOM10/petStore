"use client";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { columns, PetsColumn } from "./columns";

interface PetsClientProps {
  data: PetsColumn[];
}

export const PetsClient: React.FC<PetsClientProps> = ({ data }) => {

  return (
    <>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
