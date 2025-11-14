
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Components/AuthContext";
import UsuarioAutorizadoForm from "../Components/CrearUsuariosAutorizados";

export default function CrearUsuariosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔐 Protección: solo Admin y SuperAdmin
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.role !== "admin" && user.role !== "superadmin") {
        router.replace("/");
      }
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1f] via-[#101a33] to-[#0a0f1f] px-4">
      <div className="w-full max-w-3xl">
        <UsuarioAutorizadoForm />
      </div>
    </div>
  );
}
