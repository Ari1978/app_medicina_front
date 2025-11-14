"use client";

import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";

interface Turno {
  _id: string;
  empleado: { nombre: string; apellido: string; dni: string };
  examenes: string[];
  empresaId?: string | { empresa: string };
  hora: string;
  motivo?: string;
}

export default function AgendaTurno() {
  const { user } = useAuth();
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const API = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  // ============================================================
  // 🔥 DEFINIR ENDPOINT SEGÚN ROL REAL DEL BACKEND ASMEL
  // ============================================================
  const getEndpoint = () => {
    if (!user) return "";

    if (user.role === "user") {
      // Empresa solo ve SUS propios turnos confirmados
      return `${API}/api/turnos/mis/confirmados?fecha=${fecha}`;
    }

    if (user.role === "staff") {
      return `${API}/api/turnos/confirmados?fecha=${fecha}`;
    }

    if (user.role === "admin" || user.role === "superadmin") {
      return `${API}/api/turnos/admin/all?fecha=${fecha}`;
    }

    return "";
  };

  // ============================================================
  // 🔥 CARGAR TURNOS
  // ============================================================
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!user) return;

      const endpoint = getEndpoint();
      if (!endpoint) return;

      try {
        setMsg(null);
        setLoading(true);

        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Error cargando turnos");
        }

        setTurnos(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("❌ Error cargando turnos:", err);
        setMsg(err.message);
        setTurnos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [fecha, user]);

  // ============================================================
  // 🔥 EXPORTAR EXCEL
  // ============================================================
  const handleDescargarExcel = async () => {
    try {
      setLoading(true);

      let endpoint = "";

      if (user?.role === "staff") {
        endpoint = `${API}/api/turnos/exportar?fecha=${fecha}`;
      } else if (user?.role === "admin" || user?.role === "superadmin") {
        endpoint = `${API}/api/turnos/admin/exportar?fecha=${fecha}`;
      } else {
        throw new Error("Solo STAFF o ADMIN pueden exportar");
      }

      const res = await fetch(endpoint, { credentials: "include" });
      if (!res.ok) throw new Error("Error exportando Excel");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Turnos_${fecha}.xlsx`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("❌ Error Excel:", err);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 🔥 RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">📋 Turnos del día</h1>

        {/* Fecha */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-gray-400 text-sm">Seleccioná fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl text-white px-3 py-2"
          />
        </div>

        {/* Tabla */}
        <div className="w-full overflow-x-auto bg-gray-950/60 rounded-2xl border border-gray-700 shadow-lg">
          <table className="w-full text-sm md:text-base text-center border border-gray-700 border-collapse">
            <thead className="bg-blue-800/60 text-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Apellido y Nombre</th>
                <th className="p-2 border">DNI</th>
                <th className="p-2 border">Estudios</th>
                <th className="p-2 border">Empresa</th>
                <th className="p-2 border">Hora</th>
              </tr>
            </thead>

            <tbody>
              {turnos.map((t, i) => (
                <tr
                  key={t._id}
                  className={i % 2 === 0 ? "bg-gray-900/60" : "bg-gray-800/60"}
                >
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">
                    {`${t.empleado.apellido} ${t.empleado.nombre}`}
                  </td>
                  <td className="p-2 border">{t.empleado.dni}</td>
                  <td className="p-2 border">{t.examenes.join(", ")}</td>

                  {/* Empresa real → backend usa empresaId */}
                  <td className="p-2 border">
                    {typeof t.empresaId === "object"
                      ? t.empresaId.empresa
                      : "-"}
                  </td>

                  <td className="p-2 border">{t.hora}</td>
                </tr>
              ))}

              {turnos.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-gray-400 border text-center">
                    {loading ? "Cargando..." : "No hay turnos confirmados para esta fecha."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {(user?.role === "staff" || user?.role === "admin" || user?.role === "superadmin") && (
          <button
            onClick={handleDescargarExcel}
            disabled={loading || turnos.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {loading ? "Generando..." : "📥 Exportar a Excel"}
          </button>
        )}

        {msg && <p className="text-red-400">{msg}</p>}
      </div>
    </div>
  );
}
