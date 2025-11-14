"use client";

import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";

interface Turno {
  _id: string;
  empleado: { nombre: string; apellido: string; dni: string };
  examenes: string[];
  user: { empresa: string };
  hora: string;
  motivo?: string;
}

export default function AgendaTurno() {
  const { user } = useAuth();
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // 🔥 Backend seguro
  const API = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  // ----------------------------------------------------
  // 🔥 CARGAR TURNOS SEGÚN ROL REAL DEL SISTEMA ASMEL
  // ----------------------------------------------------
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!user) return;

      try {
        setMsg(null);
        setLoading(true);

        let endpoint = "";

        if (user.role === "user") {
          // Usuario empresa → solo sus turnos confirmados
          endpoint = `${API}/api/turnos/mis-turnos?fecha=${fecha}`;
        } else if (user.role === "staff") {
          // Staff → todos los confirmados
          endpoint = `${API}/api/turnos/confirmados?fecha=${fecha}`;
        } else if (user.role === "admin" || user.role === "superadmin") {
          // Admin → todos los confirmados del sistema
          endpoint = `${API}/api/turnos/confirmados?fecha=${fecha}`;
        }

        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json().catch(() => null);

        if (!res.ok) throw new Error(data?.message || "Error cargando turnos del día");

        setTurnos(data || []);
      } catch (err: any) {
        console.error("❌ Error en AgendaTurno:", err.message);
        setMsg(err.message);
        setTurnos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [fecha, user]);

  // ----------------------------------------------------
  // 🔥 EXPORTAR EXCEL
  // ----------------------------------------------------
  const handleDescargarExcel = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/turnos/exportar?fecha=${fecha}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error generando Excel");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Turnos_${fecha}.xlsx`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("❌ Error Excel:", err.message);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">📋 Turnos del día</h1>

        {/* Selector de fecha */}
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
                <tr key={t._id} className={i % 2 === 0 ? "bg-gray-900/60" : "bg-gray-800/60"}>
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{`${t.empleado.apellido} ${t.empleado.nombre}`}</td>
                  <td className="p-2 border">{t.empleado.dni}</td>
                  <td className="p-2 border">{t.examenes.join(", ")}</td>
                  <td className="p-2 border">{t.user?.empresa || "-"}</td>
                  <td className="p-2 border">{t.hora}</td>
                </tr>
              ))}

              {turnos.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-gray-400 border text-center">
                    {loading ? "Cargando turnos..." : "No hay turnos confirmados para esta fecha."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleDescargarExcel}
          disabled={loading || turnos.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Generando..." : "📥 Exportar a Excel"}
        </button>

        {msg && <p className="text-red-400">{msg}</p>}
      </div>
    </div>
  );
}
