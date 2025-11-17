
import { useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";

export default function MarketingEmpresa() {
  const [form, setForm] = useState({
    tipoConsulta: "",
    detalle: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Marketing:", form);
    alert("Consulta de marketing registrada (mock).");
  };

  return (
    <DashboardLayout role="user">
      <h2 className="text-xl font-semibold mb-4">Marketing y abonos</h2>
      <p className="text-xs text-slate-400 mb-4">
        Pedí presupuestos, gestioná abonos mensuales y consultá por servicios
        adicionales.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4"
      >
        <div>
          <label className="text-xs text-slate-300 block mb-1">
            Tipo de consulta
          </label>
          <select
            name="tipoConsulta"
            value={form.tipoConsulta}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
          >
            <option value="">Seleccionar…</option>
            <option value="presupuesto">Pedir presupuesto</option>
            <option value="abono">Gestionar abono mensual</option>
            <option value="nomina">Gestión de nómina de empleados</option>
            <option value="otros">Otras consultas</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-300 block mb-1">
            Detalle de la consulta
          </label>
          <textarea
            name="detalle"
            value={form.detalle}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-semibold"
          >
            Enviar consulta
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
