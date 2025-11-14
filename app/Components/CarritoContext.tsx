"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Turno {
  _id?: string;
  fecha: string;
  hora: string;
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

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  if (!API_URL) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL");

  const isLoggedIn = () => {
    if (typeof document === "undefined") return false;
    return (
      document.cookie.includes("asmel_token=") ||
      document.cookie.includes("asmel_staff_token=") ||
      document.cookie.includes("asmel_admin_token=")
    );
  };

  // =====================================================
  // 🧺 Cargar carrito automáticamente cuando hay login
  // =====================================================
  useEffect(() => {
    const cargar = async () => {
      if (!user) return;
      if (user.role !== "user") return;
      if (!isLoggedIn()) return;

      try {
        const res = await fetch(`${API_URL}/api/carrito`, {
          credentials: "include",
        });

        if (!res.ok) {
          setCarrito([]);
          return;
        }

        const data = await res.json();
        setCarrito(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("❌ Error cargando carrito:", e);
        setCarrito([]);
      }
    };

    cargar();
  }, [user]);

  // =====================================================
  // ➕ AGREGAR TURNO AL CARRITO (empresa)
  // =====================================================
  const addToCarrito = async (turno: Turno) => {
    if (!user) throw new Error("No autenticado");
    if (user.role !== "user") throw new Error("Solo empresa puede agregar turnos");

    const res = await fetch(`${API_URL}/api/carrito`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turno), // 🔥 solo manda datos del turno
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Error addToCarrito:", data);
      throw new Error(data.message || "No se pudo agregar al carrito");
    }

    setCarrito((prev) => [...prev, data]);
  };

  // =====================================================
  // 🗑️ ELIMINAR TURNO DEL CARRITO
  // =====================================================
  const removeFromCarrito = async (turnoId: string) => {
    const res = await fetch(`${API_URL}/api/carrito/${turnoId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("No se pudo eliminar");

    setCarrito((prev) => prev.filter((t) => t._id !== turnoId));
  };

  // =====================================================
  // 🧹 LIMPIAR CARRITO
  // =====================================================
  const clearCarrito = async () => {
    const res = await fetch(`${API_URL}/api/carrito/clear`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("No se pudo vaciar");

    setCarrito([]);
  };

  // =====================================================
  // ✅ CONFIRMAR TODOS LOS TURNOS
  // =====================================================
  const confirmarCarrito = async () => {
    const res = await fetch(`${API_URL}/api/carrito/confirmar`, {
      method: "PUT",
      credentials: "include",
    });

    if (!res.ok) throw new Error("No se pudo confirmar");

    setCarrito([]);
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
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
};
