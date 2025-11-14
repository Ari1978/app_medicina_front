"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCarrito } from "./CarritoContext";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

export default function CarritoFlotante() {
  const { carrito } = useCarrito();
  const { user } = useAuth();
  const router = useRouter();

  const [contador, setContador] = useState(0);

  // ===========================
  // CONTADOR
  // ===========================
  useEffect(() => {
    if (!Array.isArray(carrito)) {
      setContador(0);
      return;
    }
    setContador(carrito.length);
  }, [carrito]);

  // ===========================
  // OCULTAR CUANDO NO CORRESPONDE
  // ===========================
  if (!user) return null;               // No logueado → no mostrar
  if (user.role !== "user") return null; // Staff/Admin no usan carrito

  return (
    <div
      onClick={() => router.push("/Cart")}
      className="fixed top-5 right-5 z-50 cursor-pointer flex items-center justify-center"
    >
      <div className="relative transform rotate-12 scale-110 shadow-lg">
        <FaShoppingCart className="text-4xl text-blue-400" />

        {contador > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {contador}
          </span>
        )}
      </div>
    </div>
  );
}

