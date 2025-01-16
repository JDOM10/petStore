"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: 'rgb(85, 112, 180)' }} className="border-b z-50 relative">
      <div className="flex h-20 items-center px-4 justify-between">
        <img
          src="https://img.icons8.com/ios_filled/512w/FFFFFF/dog-footprint.png"
          alt="HBO Max Logo"
          height="40"
          width="100"
          className="m-1 h-12 w-16"
        />

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {/* Icono de menú */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`flex-grow md:flex md:items-center md:space-x-7 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:block fixed md:relative left-0 md:left-auto top-16 md:top-auto w-full md:w-auto max-h-96 overflow-y-auto z-50`}
        >
          <li className="w-full md:w-auto font-mochiy text-2xl">
            <Button
              onClick={() => router.push("/")}
              className="text-md font-bold text-white w-full md:w-auto text-center py-2"
              style={{ backgroundColor: 'rgb(85, 112, 180)', borderColor: 'transparent' }}
            >
              Inicio
            </Button>
          </li>
          <li className="w-full md:w-auto font-mochiy text-2xl">
            <Button
              onClick={() => router.push("/pets")}
              className="text-md font-bold text-white w-full md:w-auto text-center py-2"
              style={{ backgroundColor: 'rgb(85, 112, 180)', borderColor: 'transparent' }}
            >
              Mascotas
            </Button>
          </li>
          <li className="w-full md:w-auto font-mochiy text-2xl">
            <Button
              onClick={() => router.push("/orders")}
              className="text-md font-bold text-white w-full md:w-auto text-center py-2"
              style={{ backgroundColor: 'rgb(85, 112, 180)', borderColor: 'transparent' }}
            >
              Órdenes
            </Button>
          </li>
          <li className="w-full md:w-auto font-mochiy text-2xl">
            <Button
              onClick={() => router.push("/store")}
              className="text-md font-bold text-white w-full md:w-auto text-center py-2"
              style={{ backgroundColor: 'rgb(85, 112, 180)', borderColor: 'transparent' }}
            >
              Tienda
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
