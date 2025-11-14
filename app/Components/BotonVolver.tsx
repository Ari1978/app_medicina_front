"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  text?: string;          // Texto opcional, por defecto "Volver"
  className?: string;     // Clases adicionales para personalizar
}

export default function BackButton({ text = "Volver", className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back(); // Vuelve a la página anterior
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-medium transition ${className}`}
    >
      <FaArrowLeft /> {text}
    </button>
  );
}

