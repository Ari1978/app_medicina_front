"use client";

import { useEffect, useState } from "react";

export default function TurnosPorUsuario() {
  const [turnos, setTurnos] = useState(null);
  const [error, setError] = useState(null);

  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/turnos/mis-turnos`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("No se pudieron cargar tus turnos");

        const data = await res.json();
        setTurnos(data);
      } catch (err) {
        setError(err.message || "Error cargando tus turnos");
      }
    })();
  }, [API]);

  if (error) return <p className="text-red-400 p-6">{error}</p>;
  if (!turnos) return <p className="text-gray-200 p-6">Cargando turnos…</p>;
  if (turnos.length === 0) return <p className="text-gray-200 p-6">No tenés turnos confirmados.</p>;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {turnos.map((t) => (
        <div
          key={t._id}
          className="rounded-2xl p-5 border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl hover:bg-white/15 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide text-white/70">Confirmado</span>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {t.hora}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-1">
            {t.fecha.split("-").reverse().join("/")} · {t.puesto}
          </h3>

          <p className="text-white/80">
            👤 {t.empleado?.nombre} {t.empleado?.apellido} · DNI {t.empleado?.dni}
          </p>

          <p className="text-white/70 mt-2">🧪 {t.examenes?.join(", ") || "—"}</p>
          <p className="text-white/60 mt-2">📞 {t.contacto?.nombre} · {t.contacto?.celular}</p>
        </div>
      ))}
    </div>
  );
}
