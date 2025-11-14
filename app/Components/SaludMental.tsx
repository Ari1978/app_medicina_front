"use client";

import { useEffect, useState } from "react";

type SM = {
  _id: string;
  userId: string;
  nombreEmpresa: string;
  nombreContacto: string;
  celular: string;
  email: string;
  motivoConsulta: string;
  tipoServicio: string;
  notas?: string;
  estado: "pendiente" | "presupuestado" | "aceptado" | "turnoAsignado";
  presupuesto?: { monto?: number; detalle?: string };
  createdAt: string;
};

export default function AdminSaludMental() {
  const [items, setItems] = useState<SM[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [presupuesto, setPresupuesto] = useState({ monto: "", detalle: "" });

  // 🔥 Usa la variable correcta
  const API = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

  if (!API) {
    console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");
  }

  // ============================
  // 🔥 CARGAR LISTA
  // ============================
  const cargar = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/api/salud-mental`, {
        credentials: "include",
        redirect: "follow",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "No autorizado");

      setItems(data);
    } catch (err: any) {
      setError(err.message || "Error cargando solicitudes");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // ============================
  // 🔥 ABRIR MODAL
  // ============================
  const abrirPresupuesto = (s: SM) => {
    setEditId(s._id);
    setPresupuesto({
      monto: s.presupuesto?.monto?.toString() || "",
      detalle: s.presupuesto?.detalle || "",
    });
    setShowModal(true);
  };

  // ============================
  // 🔥 GUARDAR PRESUPUESTO
  // ============================
  const guardarPresupuesto = async () => {
    if (!editId) return;

    try {
      const res = await fetch(`${API}/api/salud-mental/${editId}/presupuesto`, {
        method: "PUT",
        credentials: "include",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monto: Number(presupuesto.monto),
          detalle: presupuesto.detalle,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error guardando presupuesto");

      setShowModal(false);
      setEditId(null);

      await cargar();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ============================
  // 🔥 CAMBIAR ESTADO
  // ============================
  const cambiarEstado = async (id: string, estado: SM["estado"]) => {
    try {
      const res = await fetch(`${API}/api/salud-mental/${id}/estado`, {
        method: "PUT",
        credentials: "include",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await cargar();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ============================
  // 🔥 NOTIFICAR TURNOS
  // ============================
  const notificarTurnos = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/salud-mental/${id}/notificar-turnos`, {
        method: "POST",
        credentials: "include",
        redirect: "follow",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Notificado al área de turnos.");
      await cargar();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-5 py-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Solicitudes Salud Mental
      </h1>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {loading && <p className="text-gray-300 text-center">Cargando…</p>}

      {!loading && items && items.length === 0 && (
        <p className="text-gray-300 text-center">No hay solicitudes.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
        {items?.map((s) => (
          <div
            key={s._id}
            className="rounded-2xl p-5 border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl hover:bg-white/15 transition flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">
                {new Date(s.createdAt).toLocaleString()}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full border
                ${s.estado === "pendiente" ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" : ""}
                ${s.estado === "presupuestado" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : ""}
                ${s.estado === "aceptado" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : ""}
                ${s.estado === "turnoAsignado" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : ""}`}
              >
                {s.estado}
              </span>
            </div>

            {/* INFO */}
            <h3 className="text-lg font-semibold text-white">
              {s.nombreEmpresa}
            </h3>
            <p className="text-white/80">
              Contacto: {s.nombreContacto} · {s.celular}
            </p>
            <p className="text-white/80">{s.email}</p>
            <p className="text-white/80">{s.tipoServicio}</p>
            <p className="text-white/70 mt-2">Motivo: {s.motivoConsulta}</p>

            {s.notas && <p className="text-white/60 mt-1">Notas: {s.notas}</p>}

            {/* PRESUPUESTO */}
            <div className="mt-3 text-white/80">
              <p className="font-semibold">Presupuesto:</p>
              {s.presupuesto?.monto ? (
                <p>${s.presupuesto.monto} – {s.presupuesto.detalle}</p>
              ) : (
                <p className="text-white/60">Sin cargar</p>
              )}
            </div>

            {/* BOTONES */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => abrirPresupuesto(s)}
                className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Cargar/Editar presupuesto
              </button>

              {s.estado === "presupuestado" && (
                <button
                  onClick={() => cambiarEstado(s._id, "aceptado")}
                  className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                >
                  Marcar Aceptado
                </button>
              )}

              {s.estado === "aceptado" && (
                <button
                  onClick={() => notificarTurnos(s._id)}
                  className="px-3 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm"
                >
                  Notificar para turno
                </button>
              )}

              {s.estado === "turnoAsignado" && (
                <span className="text-xs text-white/60">
                  Turno ya asignado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-center">
              Cargar Presupuesto
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Monto"
                value={presupuesto.monto}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setPresupuesto({ ...presupuesto, monto: e.target.value });
                  }
                }}
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />

              <textarea
                placeholder="Detalle"
                rows={3}
                value={presupuesto.detalle}
                onChange={(e) =>
                  setPresupuesto({ ...presupuesto, detalle: e.target.value })
                }
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
              />

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancelar
                </button>

                <button
                  onClick={guardarPresupuesto}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
