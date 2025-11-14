"use client";
import Image from "next/image";

interface ServicioCardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
}

export default function ServicioCard({ titulo, descripcion, imagen }: ServicioCardProps) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Imagen */}
      <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto">
        <Image
          src={imagen}
          alt={titulo}
          fill
          className="object-cover w-full h-full"
          priority={true}
        />
      </div>

      {/* Texto y botón */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-center md:text-left">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">{titulo}</h3>
          <p className="text-gray-600 text-base sm:text-lg mb-5">{descripcion}</p>
        </div>
        <button className="mt-2 md:mt-auto self-center md:self-start bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
          Más info
        </button>
      </div>
    </div>
  );
}
