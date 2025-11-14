// app/Components/PanelStaff.tsx
"use client";

import { useAuth } from "@/app/Components/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OptionCardProps {
  title: string;
  description: string;
  href: string;
  colorLeft?: string;
  colorRight?: string;
}

const OptionCard = ({
  title,
  description,
  href,
  colorLeft = "#0f172a",
  colorRight = "#1e293b",
}: OptionCardProps) => (
  <Link
    href={href}
    className="w-full max-w-md flex rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
  >
    <div
      className="flex-1 p-6 flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${colorLeft}, ${colorRight})` }}
    >
      <h2 className="text-xl font-bold text-white mb-2 text-center">{title}</h2>
      <p className="text-gray-200 text-center">{description}</p>
    </div>
    <div
      className="flex-1 flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #1f2937, #374151)" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </Link>
);

export default function PanelStaff() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // 🔒 Protección de ruta corregida (evita redirect prematuro en Vercel)
  useEffect(() => {
    if (loading) return;        // 👈 Espera SIEMPRE a que AuthContext termine
    if (!user || user.role !== "staff") {
      router.replace("/login-empleados");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando panel de Staff...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-5 py-10 items-center">
      <div className="flex w-full max-w-5xl justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Panel Staff</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm">{user.nombre} {user.apellido} ({user.role})</span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Turnos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-7">
          <OptionCard title="Turnos Confirmados" description="Ver todos los turnos confirmados" href="/staff/turnos" />
          <OptionCard title="Crear Turno" description="Registrar un nuevo turno provisional" href="/staff/turnos/nuevo" />
          <OptionCard title="Turnos Provisionales" description="Gestionar turnos pendientes" href="/staff/turnos/provisionales" />
        </div>
      </section>

      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Gestión de Usuarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center p-7">
          <OptionCard title="Mis Clientes" description="Ver clientes asignados" href="/staff/clientes" />
          <OptionCard title="Crear Cliente" description="Registrar un nuevo cliente" href="/staff/clientes/nuevo" />
        </div>
      </section>
    </div>
  );
}
