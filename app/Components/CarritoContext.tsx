"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Turno {
  _id?: string;
  fecha: string;
  hora: string;
  provisional?: boolean;
  confirmado?: boolean;
  empleado: {
    nombre: string;
    apellido: string;
    dni: string;
  };
  contacto: {
    nombre: string;
    celular: string;
  };
  puesto: string;
  examenes: string[];
  motivo?: string;
  user: string;
  empresaId?: string;
  creadoPor?: string;
  creadoPorTipo?: string;
}

interface CarritoContextType {
  carrito: Turno[];
  addToCarrito: (turno: Turno) => Promise<void>;
  removeFromCarrito: (turnoId: string) => Promise<void>;
  clearCarrito: () => Promise<void>;
  confirmarCarrito: () => Promise<void>;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState<Turno[]>([]);

  // === 🔥 URL correcta desde Vercel ===
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  if (!API_URL) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");

  // ---------------------------
  // Detectar cookie
  // ---------------------------
  const hasToken = () => {
    if (typeof document === "undefined") return false;
    return (
      document.cookie.includes("asmel_token=") ||
      document.cookie.includes("asmel_staff_token=")
    );
  };

  // ---------------------------
  // Cargar carrito
  // ---------------------------
  useEffect(() => {
    const cargarCarrito = async () => {
      if (!hasToken()) return;

      if (!user || user.role !== "user") {
        setCarrito([]);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/carrito`, {
          method: "GET",
          credentials: "include",
          redirect: "follow",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json().catch(() => []);

        if (!res.ok) {
          setCarrito([]);
          return;
        }

        setCarrito(data);
      } catch (err) {
        console.error("❌ Error cargando carrito:", err);
      }
    };

    cargarCarrito();
  }, [user]);

  // ---------------------------
  // Agregar turno
  // ---------------------------
  const addToCarrito = async (turno: Turno) => {
    if (!user) throw new Error("No autenticado");
    if (user.role !== "user") throw new Error("Solo clientes pueden usar carrito");

    const turnoData = {
      ...turno,
      user: user.id || "",
      empresaId: user.id || "",
      creadoPor: user.id || "",
      creadoPorTipo: "User",
      provisional: true,
      confirmado: false,
    };

    const res = await fetch(`${API_URL}/api/carrito`, {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turnoData),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("❌ Error addToCarrito:", data);
      throw new Error(data.message || "No se pudo agregar al carrito");
    }

    setCarrito((prev) => [...prev, data]);
  };

  // ---------------------------
  // Eliminar
  // ---------------------------
  const removeFromCarrito = async (turnoId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/${turnoId}`, {
        method: "DELETE",
        credentials: "include",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("No se pudo eliminar el turno");

      setCarrito((prev) => prev.filter((t) => t._id !== turnoId));
    } catch (err) {
      console.error("❌ Error removeFromCarrito:", err);
    }
  };

  // ---------------------------
  // Vaciar
  // ---------------------------
  const clearCarrito = async () => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/clear`, {
        method: "DELETE",
        credentials: "include",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("No se pudo vaciar el carrito");

      setCarrito([]);
    } catch (err) {
      console.error("❌ Error clearCarrito:", err);
    }
  };

  // ---------------------------
  // Confirmar
  // ---------------------------
  const confirmarCarrito = async () => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/confirmar`, {
        method: "PUT",
        credentials: "include",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("No se pudo confirmar");

      setCarrito([]);
    } catch (err) {
      console.error("❌ Error confirmarCarrito:", err);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addToCarrito,
        removeFromCarrito,
        clearCarrito,
        confirmarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  return ctx;
};
