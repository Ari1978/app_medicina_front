"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";

type Msg = { type: "ok" | "err"; text: string } | null;

const AREAS = [
  { nombre: "Psicológica", desc: "Estrés, ansiedad, conflictos laborales, orientación emocional.", icon: "🧠" },
  { nombre: "Psiquiátrica", desc: "Evaluación clínica, medicación, trastornos del ánimo.", icon: "💊" },
  { nombre: "Traumatológica", desc: "Lesiones laborales, ergonomía, aptos físicos y derivaciones.", icon: "🦴" },
  { nombre: "Otro", desc: "No sé qué corresponde, necesito asesoramiento.", icon: "❓" },
];

export default function AsesoramientoIntegral() {
  const { user } = useAuth();

  // 🔥 UNIFICADO — mismo backend para toda la app
  const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  const [area, setArea] = useState("");
  const [otroMotivo, setOtroMotivo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cuit, setCuit] = useState("");
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [consulta, setConsulta] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [errores, setErrores] = useState<{ [k: string]: string }>({});

  // Autocompletar desde Auth
  const usarMisDatos = () => {
    if (!user) return;

    if (user.role === "user") {
      setEmpresa(user.empresa || "");
      setCuit(user.cuit || "");
      setNombre(user.contacto?.nombre || "");
      setEmail(user.contacto?.email || user.email || "");
    }
  };

  // Validaciones
  const validarFormulario = () => {
    const errs: any = {};
    if (!area) errs.area = "Seleccioná un área de asesoramiento";
    if (area === "Otro" && otroMotivo.trim().length < 5)
      errs.otroMotivo = "Describí el motivo (mínimo 5 caracteres)";
    if (!empresa.trim()) errs.empresa = "Completá la empresa o razón social";
    if (!/^\d{11}$/.test(cuit)) errs.cuit = "El CUIT debe tener 11 dígitos";
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(nombre))
      errs.nombre = "Nombre inválido";
    if (!/^\d{8,14}$/.test(celular)) errs.celular = "Celular inválido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email inválido";
    if (consulta.trim().length < 10) errs.consulta = "Consulta muy breve";

    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!validarFormulario()) return;

    const payload = {
      empresa: empresa.trim(),
      cuit: cuit.trim(),
      contacto: {
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: celular.trim(),
      },
      servicio: area === "Otro" ? `Otro: ${otroMotivo.trim()}` : area,
      mensaje: consulta.trim(),
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/asesoramiento/solicitudes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) throw new Error(data?.message || "Error al enviar la solicitud");

      setMsg({
        type: "ok",
        text: "Solicitud enviada correctamente. El Dr. Riccobelli te contactará.",
      });

      // limpiar todo
      setArea("");
      setOtroMotivo("");
      setEmpresa("");
      setCuit("");
      setNombre("");
      setCelular("");
      setEmail("");
      setConsulta("");
      setErrores({});
    } catch (err: any) {
      setMsg({ type: "err", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const msgWhatsApp = encodeURIComponent(
    `Hola Dr. Riccobelli, necesito asesoramiento en el área: ${area || "Sin especificar"}.
Empresa: ${empresa || "-"}
CUIT: ${cuit || "-"}
Contacto: ${nombre || "-"} - ${celular || "-"}`
  );

  return (
    <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Asesoramiento Médico Integral para Empresas
      </h1>

      {/* Mensajes */}
      {msg && (
        <div
          className={`mb-4 p-3 rounded-lg text-center ${
            msg.type === "ok"
              ? "bg-green-700/40 text-green-300"
              : "bg-red-700/40 text-red-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Botones */}
      <h3 className="text-xl font-semibold mb-3">Seleccione el área de asesoramiento</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {AREAS.map((a) => (
          <button
            key={a.nombre}
            type="button"
            onClick={() => setArea(a.nombre)}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              area === a.nombre
                ? "bg-blue-600 border-blue-400"
                : "bg-white/10 border-white/20 hover:bg-blue-500/30"
            }`}
          >
            <div className="text-2xl">{a.icon}</div>
            <h4 className="font-semibold text-lg">{a.nombre}</h4>
            <p className="opacity-80">{a.desc}</p>
          </button>
        ))}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {area === "Otro" && (
          <>
            <input
              placeholder="Describí brevemente el motivo"
              value={otroMotivo}
              onChange={(e) => setOtroMotivo(e.target.value)}
              className="bg-white/20 p-2 rounded-lg"
            />
            {errores.otroMotivo && <p className="text-red-400">{errores.otroMotivo}</p>}
          </>
        )}

        {/* Autocompletar */}
        <button
          type="button"
          onClick={usarMisDatos}
          className="bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-lg text-sm font-semibold w-fit"
        >
          Usar mis datos
        </button>

        {/* Campos */}
        <input
          placeholder="Empresa / Razón social"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="bg-white/20 p-2 rounded-lg"
        />
        {errores.empresa && <p className="text-red-400">{errores.empresa}</p>}

        <input
          placeholder="CUIT"
          value={cuit}
          onChange={(e) => setCuit(e.target.value.replace(/\D/g, ""))}
          className="bg-white/20 p-2 rounded-lg"
        />
        {errores.cuit && <p className="text-red-400">{errores.cuit}</p>}

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""))
          }
          className="bg-white/20 p-2 rounded-lg"
        />
        {errores.nombre && <p className="text-red-400">{errores.nombre}</p>}

        <input
          placeholder="Celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value.replace(/\D/g, ""))}
          className="bg-white/20 p-2 rounded-lg"
        />
        {errores.celular && <p className="text-red-400">{errores.celular}</p>}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/20 p-2 rounded-lg"
        />
        {errores.email && <p className="text-red-400">{errores.email}</p>}

        <textarea
          placeholder="Consulta"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          className="bg-white/20 p-2 rounded-lg min-h-[100px]"
        />
        {errores.consulta && <p className="text-red-400">{errores.consulta}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold mt-2 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}
