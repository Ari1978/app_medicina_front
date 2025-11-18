import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../layout/DashboardLayout";

const MOTIVOS = [
  "Ingreso",
  "Periódico",
  "Egreso",
  "Estudios adicionales",
  "Estudios complementarios",
];

const FRANJAS = [
  "07:00","07:15","07:30","07:45",
  "08:00","08:15","08:30","08:45",
  "09:00","09:15","09:30","09:45",
  "10:00","10:15","10:30",
];

export default function ExamenesMedicos() {
  const [form, setForm] = useState({
    empleadoNombre: "",
    dni: "",
    motivo: "",
    puesto: "",
    examenAdicional: "",
    contactoNombre: "",
    contactoCelular: "",
    fecha: "",
    franja: "",
    comentarios: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud de examen:", form);
    alert("Solicitud de examen registrada (mock).");
  };

  return (
    <DashboardLayout role="user">

      {/* 🟦 FIX MARGEN MOBILE PARA QUE NO TAPE EL TÍTULO */}
      <div className="mt-14 lg:mt-0">

        {/* 🔙 BOTÓN VOLVER */}
        <Link
          to="/dashboard/empresa"
          className="inline-block mb-4 px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700 hover:bg-slate-700 hover:text-white transition"
        >
          ← Volver al inicio
        </Link>

        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Exámenes médicos
        </h2>

        <p className="text-xs text-slate-600 mb-4">
          Programá exámenes de ingreso, periódicos, egreso y estudios complementarios.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-24"
        >
          {/* FORMULARIO */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">
              Apellido y nombre del empleado
            </label>
            <input
              name="empleadoNombre"
              value={form.empleadoNombre}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">DNI</label>
            <input
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

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
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Puesto</label>
            <input
              name="puesto"
              value={form.puesto}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-300 block mb-1">
              Agregar examen adicional
            </label>
            <input
              name="examenAdicional"
              value={form.examenAdicional}
              onChange={handleChange}
              placeholder="Ej: Espirometría, Rx columna..."
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">
              Contacto nombre
            </label>
            <input
              name="contactoNombre"
              value={form.contactoNombre}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Contacto celular</label>
            <input
              name="contactoCelular"
              value={form.contactoCelular}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">Seleccioná fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Franja */}
          <div>
            <label className="text-xs text-slate-300 block mb-1">
              Seleccioná franja horaria
            </label>
            <select
              name="franja"
              value={form.franja}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
              disabled={!form.fecha}
            >
              <option value="">
                {form.fecha
                  ? "Elegí una franja (cupos simulados: 5)"
                  : "Elegí una fecha primero"}
              </option>
              {form.fecha &&
                FRANJAS.map((hora) => (
                  <option key={hora} value={hora}>
                    {hora} (5 cupos)
                  </option>
                ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-300 block mb-1">Comentarios</label>
            <textarea
              name="comentarios"
              value={form.comentarios}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-semibold"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>

    </DashboardLayout>
  );
}
