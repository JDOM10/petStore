import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PetsColumn = {
  id: number;
  name: string;
  category: { id: number; name: string }; // Cambiado para reflejar la estructura real
  status: string;
  photoUrls: string[];
};

export const columns: ColumnDef<PetsColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "category.name",
    header: "Categoría",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status === "Disponible"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {row.original.status === "Disponible" ? "Disponible" : "No Disponible"}
      </span>
    ),
  },
  {
    accessorKey: "photoUrls",
    header: "Foto",
    cell: ({ row }) => (
      <img
        src={row.original.photoUrls?.[0] || "/default-pet.png"} // Muestra la primera foto o una por defecto
        alt={row.original.name}
        className="w-12 h-12 object-cover rounded-full"
      />
    ),
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
