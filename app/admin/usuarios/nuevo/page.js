"use client";

import { useAuth } from "@/app/Components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminUserNuevo from "../../../Components/StaffNuevo";

export default function UserNuevoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // ✅ Permitir acceso solo a admin y superadmin
      if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
        router.replace("/login-empleados");
      }
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-white p-6">Cargando...</p>;
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-15 text-white">
      <h1 className="text-3xl font-bold text-center mb-4">👤 Form new Staff</h1>
      <AdminUserNuevo />
    </div>
  );
}
