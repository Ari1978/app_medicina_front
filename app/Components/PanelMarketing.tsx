"use client";

import { useAuth } from "@/app/Components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Solicitud = {
  _id: string;
  motivoConsulta: string;
  descripcion: string;
  estado: "pendiente" | "presupuestado" | "aceptado" | "rechazado";
  presupuesto?: { monto?: number; detalle?: string; enviadoAlCliente?: boolean };
  comentariosInternos?: { mensaje: string; autor: string; fecha: string }[];
  createdAt: string;
};

const ESTADOS = ["pendiente", "presupuestado", "aceptado", "rechazado"] as const;

// ----------------------------------------------------
// CARD
// ----------------------------------------------------
function SolicitudCard({
  solicitud,
  onEstado,
  onPresupuesto,
  onComentario,
}: {
  solicitud: Solicitud;
  onEstado: (id: string, estado: string) => Promise<void>;
  onPresupuesto: (id: string, p: any) => Promise<void>;
  onComentario: (id: string, msg: string) => Promise<void>;
}) {
  return (
    <div className="rounded-2xl p-5 border border-white/10 bg-white/10 backdrop-blur-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{solicitud.motivoConsulta}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20">
          {solicitud.estado}
        </span>
      </div>

      <p className="opacity-80 mb-2">{solicitud.descripcion}</p>
      <p className="text-sm opacity-70 mb-3">
        Creado: {new Date(solicitud.createdAt).toLocaleString()}
      </p>

      <PresupuestoEditor
        s={solicitud}
        onSave={(p) => onPresupuesto(solicitud._id, p)}
      />

      <div className="flex gap-2 my-3">
        {ESTADOS.map((e) => (
          <button
            key={e}
            onClick={() => onEstado(solicitud._id, e)}
            className={`px-3 py-1 rounded text-sm border border-white/20 ${
              solicitud.estado === e ? "bg-white/20" : "bg-white/10"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <Comentarios
        comentarios={solicitud.comentariosInternos || []}
        onAdd={(msg) => onComentario(solicitud._id, msg)}
      />
    </div>
  );
}

// ----------------------------------------------------
// PRESUPUESTO
// ----------------------------------------------------
function PresupuestoEditor({
  s,
  onSave,
}: {
  s: Solicitud;
  onSave: (p: any) => Promise<void>;
}) {
  const [monto, setMonto] = useState(s.presupuesto?.monto ?? "");
  const [detalle, setDetalle] = useState(s.presupuesto?.detalle ?? "");
  const [enviado, setEnviado] = useState(s.presupuesto?.enviadoAlCliente ?? false);

  return (
    <div className="bg-white/5 p-3 rounded border border-white/10 mt-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          className="bg-white/10 border border-white/20 rounded px-3 py-2"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          inputMode="numeric"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={enviado}
            onChange={(e) => setEnviado(e.target.checked)}
          />
          Enviado al cliente
        </label>
      </div>
      <textarea
        className="mt-2 w-full bg-white/10 border border-white/20 rounded px-3 py-2"
        placeholder="Detalle"
        value={detalle}
        onChange={(e) => setDetalle(e.target.value)}
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={() =>
            onSave({ monto: Number(monto || 0), detalle, enviadoAlCliente: enviado })
          }
          className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Guardar presupuesto
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// COMENTARIOS
// ----------------------------------------------------
function Comentarios({
  comentarios,
  onAdd,
}: {
  comentarios: { mensaje: string; autor: string; fecha: string }[];
  onAdd: (msg: string) => Promise<void>;
}) {
  const [msg, setMsg] = useState("");

  return (
    <div className="mt-3">
      <div className="text-sm opacity-90 mb-1">Comentarios internos</div>
      <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
        {comentarios.map((c, idx) => (
          <div
            key={idx}
            className="text-sm bg-white/5 border border-white/10 rounded px-3 py-2"
          >
            <div className="opacity-80">{c.mensaje}</div>
            <div className="text-xs opacity-60 mt-1">
              {c.autor} · {new Date(c.fecha).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2"
          placeholder="Agregar comentario"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-white/10 border border-white/20 rounded"
          onClick={() => {
            onAdd(msg);
            setMsg("");
          }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 🔥 DASHBOARD MARKETING
// ----------------------------------------------------
export default function MarketingDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");

  // 🔥 VARIABLE CORREGIDA
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!loading) {
      const noAccess =
        !user ||
        (user.role === "staff" && !user.permisos?.includes("marketing"));

      if (noAccess && user?.role !== "admin" && user?.role !== "superadmin") {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-white p-6">Cargando...</p>;
  if (!user) return null;

  const cargar = async () => {
    const qs = estadoFiltro ? `?estado=${estadoFiltro}` : "";
    const res = await fetch(`${API}/api/marketing/solicitudes${qs}`, {
      credentials: "include",
    });
    const data = await res.json();
    setSolicitudes(data);
  };

  useEffect(() => {
    cargar();
  }, [estadoFiltro]);

  const actualizarPresupuesto = async (id: string, payload: any) => {
    await fetch(`${API}/api/marketing/solicitudes/${id}/presupuesto`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await cargar();
  };

  const cambiarEstado = async (id: string, estado: string) => {
    await fetch(`${API}/api/marketing/solicitudes/${id}/estado`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    await cargar();
  };

  const comentar = async (id: string, mensaje: string) => {
    if (!mensaje.trim()) return;
    await fetch(`${API}/api/marketing/solicitudes/${id}/comentarios`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje }),
    });
    await cargar();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-5 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel Marketing — Solicitudes</h1>

        <div className="flex gap-3 mb-6 items-center">
          <span className="opacity-80">Filtrar por estado:</span>
          <select
            className="bg-white/10 border border-white/20 rounded px-3 py-2"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 rounded bg-white/10 border border-white/20"
            onClick={cargar}
          >
            Refrescar
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {solicitudes.map((s) => (
            <SolicitudCard
              key={s._id}
              solicitud={s}
              onEstado={cambiarEstado}
              onPresupuesto={actualizarPresupuesto}
              onComentario={comentar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
