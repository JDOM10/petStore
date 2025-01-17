import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const generateRandomId = () => Math.floor(Math.random() * 9999) + 1;

// Esquema de validación con zod
const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  category: z.object({
    id: z.number().nonnegative(),
    name: z.string().min(1, { message: "Debe seleccionar una categoría." }),
  }),
  photoUrls: z.optional(z.string()),// photoUrls como array de cadenas
  status: z.string().min(1, { message: "Debe seleccionar un estado." }), // Validación para el estado
});

type PetsFormValues = z.infer<typeof formSchema>;

export const PetsForm: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastMessage = initialData ? "Mascota actualizada" : "Mascota creada";

  const categories = [
    { id: 1, name: "Perro" },
    { id: 2, name: "Gato" },
    { id: 3, name: "Pájaro" },
    { id: 4, name: "Conejo" },
    { id: 5, name: "Pez" },
  ];

  const form = useForm<PetsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: { id: 0, name: "" },
      photoUrls: "", // Cambiado a string vacío
      id: generateRandomId(),
    },
  });

  useEffect(() => {
    const fetchPetData = async (petId: string) => {
      if (!petId || petId === "0") {
        setInitialData(false);
        return;
      }

      try {
        const petData = await axios.get(
          `https://petstore.swagger.io/v2/pet/${petId}`
        );
        form.reset({
          ...petData.data,
          category: categories.find(
            (cat) => cat.id === petData.data.category.id
          ) || { id: 0, name: "" },
          photoUrls: petData.data.photoUrls.join(", "),// Dejar como string
        });
        setInitialData(true);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          toast.error("Mascota no encontrada.");
        } else {
          console.error("Error fetching pet data:", error);
        }
        setInitialData(false);
      }
    };

    fetchPetData(params.petId as string);
  }, [params.petId, form]);

  const onSubmit = async (data: PetsFormValues) => {
    try {
      setLoading(true);
      const payload = {
        id: data.id,
        name: data.name,
        category: { id: data.category.id, name: data.category.name },
        photoUrls: data.photoUrls ? [data.photoUrls] : [], // Convertir string a array
        status: data.status,
      };

      if (initialData) {
        await axios.put(`https://petstore.swagger.io/v2/pet`, payload);
      } else {
        await axios.post(`https://petstore.swagger.io/v2/pet`, payload);
      }

      router.push(`/pets`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Algo estuvo mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://petstore.swagger.io/v2/pet/${params.petId}`);
      router.refresh();
      router.push(`/pets`);
      router.refresh();
      toast.success("Mascota borrada");
    } catch (error: any) {
      toast.error("Algo salió mal.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="p-6 bg-white">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={initialData ? "Editar Mascota" : "Crear Mascota"}
          description={
            initialData
              ? "Editar una mascota existente."
              : "Añadir una nueva mascota."
          }
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex">
      <div className="flex-1 space-y-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <FormLabel>Categoría*</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      value={field.value.name}
                      onValueChange={(value) => {
                        const selectedCategory = categories.find(
                          (cat) => cat.name === value
                        );
                        if (selectedCategory) {
                          field.onChange(selectedCategory);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <FormLabel>Raza*</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Ej: Golden Retriever" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photoUrls"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <FormLabel>URL de Foto</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="URL de la foto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <FormLabel>Estado*</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="vendido">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="hidden"
                      disabled={loading || initialData}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-start space-x-4">
              <Button type="submit" disabled={loading}>
                {initialData ? "Guardar Cambios" : "Crear"}
              </Button>

              <Button type="button" variant="outline" disabled={loading} onClick={() => router.push(`/pets`)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* Imagen */}
      <div className="ml-6">
        <img
          src="https://juandiegoosorio.neocities.org/images/mas2.jpg"
          alt="Mascota"
          className="rounded-lg w-96 h-auto"
        />
      </div>
    </div>
    </div >
  );
};
