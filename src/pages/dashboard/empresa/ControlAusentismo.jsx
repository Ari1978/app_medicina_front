
import { useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";

export default function ControlAusentismo() {
  const [form, setForm] = useState({
    empleadoNombre: "",
    motivo: "",
    autorizaNombre: "",
    autorizaTelefono: "",
    comentarios: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ausentismo enviado:", form);
    alert("Solicitud de ausentismo registrada (mock).");
  };

  return (
    <DashboardLayout role="user">
      <h2 className="text-xl font-semibold mb-4">Control de ausentismo</h2>
      <p className="text-xs text-slate-400 mb-4">
        Registrá un nuevo caso de ausentismo para evaluación médica.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
          <label className="text-xs text-slate-300 block mb-1">
            Motivo de la consulta
          </label>
          <input
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-slate-300 block mb-1">
            Quién lo autoriza
          </label>
          <input
            name="autorizaNombre"
            value={form.autorizaNombre}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-slate-300 block mb-1">
            Teléfono de contacto del autorizante
          </label>
          <input
            name="autorizaTelefono"
            value={form.autorizaTelefono}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs text-slate-300 block mb-1">
            Comentarios
          </label>
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
    </DashboardLayout>
  );
}
