import { useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const MOTIVOS = ["Ingreso", "Periódico", "Egreso", "Estudios adicionales", "Estudios complementarios"];

const FRANJAS = [
  "07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45",
  "09:00","09:15","09:30","09:45","10:00","10:15","10:30"
];

// 🔹 Estudios posibles
const ESTUDIOS = [
  "Básico de ley",
  "Psicotécnico",
  "Audiometría",
  "Espirometría",
  "Rx columna F/P",
  "Electroencefalograma",
  "Ergometría",
];

export default function ExamenesMedicos() {
  const { user } = useAuth();
  const perfiles = user?.perfilesExamen || [];

  const [form, setForm] = useState({
    empleadoNombre: "",
    dni: "",
    motivo: "",
    puesto: "",
    estudiosSeleccionados: [],
    contactoNombre: "",
    contactoCelular: "",
    fecha: "",
    franja: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePuesto = (puesto) => {
    const perfil = perfiles.find((p) => p.puesto === puesto);

    setForm({
      ...form,
      puesto,
      estudiosSeleccionados: perfil ? perfil.estudios : [],
    });
  };

  const toggleEstudio = (estudio) => {
    setForm((prev) => {
      const existe = prev.estudiosSeleccionados.includes(estudio);

      return {
        ...prev,
        estudiosSeleccionados: existe
          ? prev.estudiosSeleccionados.filter((e) => e !== estudio)
          : [...prev.estudiosSeleccionados, estudio]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud enviada:", form);
    alert("Solicitud de examen registrada (mock).");
  };

  return (
    <DashboardLayout role="user">
      <div className="mt-14 lg:mt-0">

        <h2 className="text-xl font-semibold mb-2 text-blue-600">
          Exámenes médicos
        </h2>

        {/* VOLVER */}
        <Link
          to="/dashboard/empresa"
          className="inline-block mb-4 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          ← Volver al panel
        </Link>

        <p className="text-xs text-slate-600 mb-4">
          Programá exámenes de ingreso, periódicos, egreso y estudios complementarios.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-24"
        >
          <div>
            <label className="text-xs text-slate-300 block mb-1">Apellido y nombre</label>
            <input name="empleadoNombre" value={form.empleadoNombre} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">DNI</label>
            <input name="dni" value={form.dni} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          </div>

          {/* Motivo */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Motivo</label>
            <select
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            >
              <option value="">Seleccionar…</option>
              {MOTIVOS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Puesto */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Puesto</label>
            <select
              name="puesto"
              value={form.puesto}
              onChange={(e) => handlePuesto(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            >
              <option value="">Seleccionar…</option>
              {perfiles.map((p) => (
                <option key={p.puesto} value={p.puesto}>{p.puesto}</option>
              ))}
            </select>
          </div>

          {/* Estudios (scroll + selección múltiple) */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-300 block mb-1">Estudios seleccionados</label>

            <div className="bg-slate-950 border border-slate-700 rounded p-2 max-h-40 overflow-y-auto space-y-1">
              {ESTUDIOS.map((estudio) => (
                <label key={estudio} className="flex items-center gap-2 text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.estudiosSeleccionados.includes(estudio)}
                    onChange={() => toggleEstudio(estudio)}
                  />
                  {estudio}
                </label>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Contacto nombre</label>
            <input name="contactoNombre" value={form.contactoNombre} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Contacto celular</label>
            <input name="contactoCelular" value={form.contactoCelular} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          </div>

          {/* Fecha */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Fecha</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          </div>

          {/* Franja */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Franja horaria</label>
            <select
              name="franja"
              value={form.franja}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
              disabled={!form.fecha}
            >
              <option value="">{form.fecha ? "Elegí franja" : "Elegí fecha primero"}</option>
              {form.fecha &&
                FRANJAS.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-semibold">
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
