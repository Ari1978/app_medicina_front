"use client";

import { useAuth } from "../Components/AuthContext";
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
  colorLeft = "#061942",
  colorRight = "#0e3aca",
}: OptionCardProps) => {
  return (
    <Link
      href={href}
      className="w-full max-w-md flex rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#38bdf8]"
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

export default function PanelUsuario() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔐 Protección de empresa (User)
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      // Si no es "user", redirigir al panel correspondiente
      if (user.role !== "user") {
        if (user.role === "staff") router.replace("/panelStaff");
        if (user.role === "admin" || user.role === "superadmin") router.replace("/panelAdmin");
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

  const nombreMostrar =
    user.nombre ||
    user.contacto?.nombre ||
    user.empresa ||
    "Usuario";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-5 py-16 items-center">
      <h1 className="text-3xl font-bold text-white mb-6 mt-2 text-center">
        Bienvenido {nombreMostrar}
      </h1>

      <section className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Panel de usuario
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center p-7">
          <OptionCard title="Mis Turnos" description="Turnos confirmados" href="/turnosList" />
          <OptionCard title="Generar Turnos" description="Pre-ocupacionales, periódicos y otros" href="/turnos" />
          <OptionCard title="Evaluaciones especiales" description="Asesoramiento / presupuesto" href="/asesorMedico" />
          <OptionCard title="Reportes" description="Resultados médicos" href="#" />
          <OptionCard title="Presupuestos" description="Inicie su gestión" href="#" />
          <OptionCard title="Soporte en línea" description="Chat / WhatsApp" href="#" />
          <OptionCard title="Facturación" description="Descargar mis facturas" href="#" />
        </div>
      </section>
    </div>
  );
}
