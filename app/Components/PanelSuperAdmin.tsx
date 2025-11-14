"use client";

import Link from "next/link";
import { useAuth } from "../Components/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface OptionCardProps {
  title: string;
  description: string;
  href: string;
  colorLeft?: string;
}

export const OptionCard = ({
  title,
  description,
  href,
  colorLeft = "#1E3A8A",
}: OptionCardProps) => {
  return (
    <Link
      href={href}
      className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 w-full max-w-md flex"
    >
      <div className="p-6 flex-1" style={{ backgroundColor: colorLeft }}>
        <h2 className="text-xl font-bold text-white mb-2 text-center">{title}</h2>
        <p className="text-gray-200 text-center">{description}</p>
      </div>

      <div className="p-6 flex-1 bg-gray-800 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </Link>
  );
};

export default function PanelSuperAdmin() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // =====================================================
  // 🔥 PROTECCIÓN REAL DE ROL
  // =====================================================
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin" && user.role !== "superadmin") {
        router.replace("/");
      }
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando panel...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-4 py-8 items-center">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Panel de Administración
      </h1>

      {/* =====================================================
          🔵 SECCIÓN: Gestión de Usuarios
      ===================================================== */}
      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Usuarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          <OptionCard
            title="Todos los Usuarios"
            description="Ver empresas, staff y admins"
            href="/admin/usuarios"
          />

          <OptionCard
            title="Agregar Staff"
            description="Crear staff o admin"
            href="/admin/staff/nuevo"
          />

          <OptionCard
            title="Importar Autorizados"
            description="Cargar usuarios desde Excel"
            href="/crearUsuarios"
          />
        </div>
      </section>

      {/* =====================================================
          🔵 SECCIÓN: Gestión de Turnos
      ===================================================== */}
      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Turnos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          <OptionCard
            title="Ver Turnos"
            description="Turnos confirmados del sistema"
            href="/admin/turnos"
          />

          <OptionCard
            title="Asignar Turnos"
            description="Crear turnos manualmente"
            href="/admin/turnos/nuevo"
          />

          <OptionCard
            title="Evaluaciones Especiales"
            description="Turnos complejos o excepcionales"
            href="/admin/turnos/especiales"
          />
        </div>
      </section>

      {/* =====================================================
          🔵 SECCIÓN: Facturación y Consultas
      ===================================================== */}
      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Facturación y Consultas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          <OptionCard
            title="Facturación"
            description="Facturas y cierres mensuales"
            href="/admin/facturacion"
          />

          <OptionCard
            title="Consultas"
            description="Mensajes y reclamos"
            href="/admin/consultas"
          />

          <OptionCard
            title="Reportes"
            description="Estadísticas y métricas"
            href="/admin/reportes"
          />
        </div>
      </section>
    </div>
  );
}
