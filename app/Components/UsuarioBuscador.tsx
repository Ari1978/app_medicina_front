"use client";

import { useState } from "react";

interface Usuario {
  empresa: string;
  cuit: string;
  contacto: { nombre: string; email: string; telefono?: string };
}

export default function UsuarioBuscador() {
  const [cuit, setCuit] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Backend seguro con fallback (NUNCA undefined)
  const API_URL: string = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  const handleBuscar = async () => {
    setUsuario(null);
    setMsg(null);

    if (!/^\d{11}$/.test(cuit)) {
      setMsg("CUIT inválido (11 dígitos)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/usuario/${cuit}`, {
        credentials: "include",
        redirect: "follow",
      });

      const data = await res.json();

      if (res.status === 401) {
        setMsg("Sesión expirada. Volvé a iniciar sesión.");
        return;
      }

      if (!res.ok) {
        setMsg(data.message || "Usuario no encontrado");
        return;
      }

      setUsuario(data);
    } catch (err) {
      console.error(err);
      setMsg("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        Buscar Usuario por CUIT
      </h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          placeholder="Ingrese CUIT"
          value={cuit}
          onChange={(e) => setCuit(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleBuscar}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {msg && <p className="mb-4 text-center text-red-400">{msg}</p>}

      {usuario && (
        <div className="bg-gray-800 p-4 rounded shadow-sm space-y-2">
          <p><strong>Empresa:</strong> {usuario.empresa}</p>
          <p><strong>CUIT:</strong> {usuario.cuit}</p>
          <p><strong>Contacto:</strong> {usuario.contacto.nombre}</p>
          <p><strong>Email:</strong> {usuario.contacto.email}</p>
          {usuario.contacto.telefono && (
            <p><strong>Teléfono:</strong> {usuario.contacto.telefono}</p>
          )}
        </div>
      )}
    </div>
  );
}
