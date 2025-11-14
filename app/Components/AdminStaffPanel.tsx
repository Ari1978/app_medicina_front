"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../Components/AuthContext";

interface Usuario {
  _id: string;
  username?: string;
  nombre: string;
  apellido: string;
  role: "admin" | "superadmin" | "staff";
  permisos?: string[];
  superadmin?: boolean;
  createdAt: string;
}

export default function AdminsStaffPanel() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 URL del backend en Render (normalizada)
  const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/listar-usuarios`, {
        credentials: "include",
      });

      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("❌ Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  if (loading) return <p className="text-white">Cargando usuarios...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admins y Staff</h2>
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
          {usuarios.map(u => (
            <tr key={u._id} className="hover:bg-gray-700">
              <td className="p-2 border-b">{u.username}</td>
              <td className="p-2 border-b">{u.nombre}</td>
              <td className="p-2 border-b">{u.apellido}</td>
              <td className="p-2 border-b">{u.role.toUpperCase()}</td>
              <td className="p-2 border-b">{u.permisos?.join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
