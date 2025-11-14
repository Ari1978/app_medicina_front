"use client";

import { useEffect, useState } from "react";
import { socket } from "../../lib/socketClient";

export default function TurnosConfirmados() {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 URL REAL DEL BACKEND
  const API = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
  if (!API) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL");

  const hoy = new Date().toISOString().split("T")[0];

  const formatFecha = (yyyyMMdd: string) => {
    const [y, m, d] = yyyyMMdd.split("-");
    return `${d}/${m}/${y}`;
  };

  // -------------------------------------------
  // 🔥 Cargar confirmados (filtrando por fecha)
  // -------------------------------------------
  const cargarTurnos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Backend devuelve TODOS → filtramos en front
      const res = await fetch(`${API}/api/turnos/mis/confirmados`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("No se pudieron cargar los turnos confirmados");

      const data = await res.json();

      // Filtrar turnos DEL DÍA (el backend no filtra)
      const delDia = data.filter((t: any) => t.fecha === hoy);

      setTurnos(delDia);
    } catch (err: any) {
      setError(err.message || "Error cargando turnos");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------
  // 🔥 Inicial + Sockets
  // -------------------------------------------
  useEffect(() => {
    cargarTurnos();

    const eventos = ["turno:confirmado", "turno:eliminado", "turno:provisional"];

    eventos.forEach((ev) => socket.on(ev, cargarTurnos));

    return () => {
      eventos.forEach((ev) => socket.off(ev, cargarTurnos));
    };
  }, []);

  // -------------------------------------------
  // 🔥 UI
  // -------------------------------------------

  if (loading) return <p className="text-gray-200 p-6">Cargando turnos…</p>;
  if (error) return <p className="text-red-400 p-6">{error}</p>;
  if (!turnos.length)
    return <p className="text-gray-200 p-6">No hay turnos confirmados para hoy.</p>;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {turnos.map((t) => (
        <div
          key={t._id}
          className="rounded-2xl p-5 border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase text-emerald-400">Confirmado</span>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {t.hora}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-1">
            {formatFecha(t.fecha)} · {t.puesto}
          </h3>

          <p className="text-white/80">
            👤 {t.empleado?.nombre} {t.empleado?.apellido} · DNI {t.empleado?.dni}
          </p>

          <p className="text-white/70 mt-2">🧪 {t.examenes?.join(", ") || "—"}</p>

          <p className="text-white/60 mt-2">
            📞 {t.contacto?.nombre} · {t.contacto?.celular}
          </p>
        </div>
      ))}
    </div>
  );
}
