"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../Components/AuthContext";
import { useRouter } from "next/navigation";

interface Usuario {
  _id: string;
  username?: string;
  nombre: string;
  apellido: string;
  role: "admin" | "superadmin" | "staff";
  permisos?: string[];
  createdAt: string;
}

export default function AdminsStaffPanel() {
  const { user } = useAuth();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL backend ASMEL
  const API_URL: string = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  // ----------------------------- 🔐 PROTECCIÓN -----------------------------
  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "admin" && user.role !== "superadmin") {
      router.replace("/");
    }
  }, [user, router]);

  // ----------------------------- 🔥 Fetch usuarios -----------------------------
  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/admin/listar-usuarios`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error cargando usuarios");
      }

      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida del servidor");
      }

      setUsuarios(data);
    } catch (err: any) {
      console.error("❌ Error cargando usuarios:", err);
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUsuarios();
  }, [user]);

  // ----------------------------- 🔥 UI -----------------------------

  if (!user || loading) {
    return <p className="text-white p-6 text-center">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-red-400 p-6 text-center">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Admins y Staff</h2>

      {usuarios.length === 0 ? (
        <p className="text-gray-300 text-center">No hay usuarios internos cargados.</p>
      ) : (
        <table className="w-full border border-gray-700 rounded text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border-b">Usuario</th>
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Apellido</th>
              <th className="p-2 border-b">Rol</th>
              <th className="p-2 border-b">Permisos</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u._id} className="hover:bg-gray-700">
                <td className="p-2 border-b">{u.username || "-"}</td>
                <td className="p-2 border-b">{u.nombre}</td>
                <td className="p-2 border-b">{u.apellido}</td>
                <td className="p-2 border-b">{u.role.toUpperCase()}</td>
                <td className="p-2 border-b">{u.permisos?.join(", ") || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
