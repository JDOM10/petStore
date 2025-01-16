"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="container mx-auto mt-5 p-5">
      <div className="flex">
        {/* Imagen del perro */}
        <div className="w-7/12  flex justify-start items-center">
          <img
            src="https://juandiegoosorio.neocities.org/images/perro1.jpg"
            alt="Mascota"
            className="rounded-lg w-3/4 h-auto"
          />
        </div>

        {/* Texto y contenido */}
        <div className="w-5/12 bg-white flex flex-col justify-center p-8 text-center md:text-left space-y-4">
          {/* Encabezado principal */}
          <h2 className="text-3xl font-bold" style={{ color: '#E54954' }}>
            ¡Todo lo que necesitas para tus amigos peludos!
          </h2>

          {/* Texto descriptivo */}
          <p className="text-lg text-gray-700">
            Nos apasiona ofrecer todo lo que necesitas para consentir, cuidar y mimar
            a tus compañeros peludos, emplumados o escamosos. Aquí encontrarás
            alimentos premium, juguetes irresistibles, accesorios modernos y productos
            de calidad para garantizar la felicidad y el bienestar de tu mascota.
          </p>

          {/* Frase destacada */}
          <p className="text-lg font-semibold" style={{ color: '#E54954' }}>
            ¡Ven a conocernos y descubre un mundo lleno de amor y diversión para tus
            amigos animales!
          </p>

          {/* Beneficios destacados */}
          <ul className="list-disc list-inside text-gray-700 text-base">
            <li>Accesorios modernos y resistentes</li>
            <li>Asesoría personalizada para tu mascota</li>
            <li>Productos premium para su bienestar</li>
          </ul>

          {/* Llamado a la acción */}
          <div className="mt-4">
            <button
              className="text-white font-bold py-2 px-4 rounded hover:opacity-90"
              style={{ backgroundColor: '#E54954' }}
              onClick={() => router.push("/store")}
            >
              Explora nuestros productos
            </button>
          </div>
        </div>
      </div>

      <h1 className="welcome-title">Bienvenido a Pets!</h1>
      <img src="https://juandiegoosorio.neocities.org/images/perro2.jpg" alt="Mascotas info" />

      <h1 className="welcome-title text-center">Conoce a tu nuevo amigo!</h1>
      <img src="https://juandiegoosorio.neocities.org/images/perro3.jpg" alt="Mascotas info" />
    </main>
  );
}
