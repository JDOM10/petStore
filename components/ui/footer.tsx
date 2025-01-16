export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#5570B4' }} className="text-white pt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo */}
          <div className="w-full lg:w-1/3 mb-3 flex items-center">
            <img
              src="https://img.icons8.com/ios_filled/512w/FFFFFF/dog-footprint.png"
              alt="Logo de Pets"
              height={50}
              width={50}
              className="rounded-full"
            />
            <h5 className="ml-3 text-lg font-bold">Pets - Cuidando a tus amigos</h5>
          </div>

          {/* Información de Contacto */}
          <div className="w-full lg:w-1/3 mb-3 text-center">
            <h5 className="font-bold text-lg">Contáctanos</h5>
            <p>Av. Siempre Viva 123, Springfield</p>
            <p>+1 800 555-1234</p>
            <p>contacto@pets.com</p>
          </div>

          {/* Derechos y Términos */}
          <div className="w-full lg:w-1/3 text-center lg:text-right text-sm">
            <p>
              © 2025 Pets. Todos los derechos reservados.
            </p>
            <p>
              Al usar este sitio, aceptas nuestros <a href="#" className="underline">términos</a> y nuestra <a href="#" className="underline">política de privacidad</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
