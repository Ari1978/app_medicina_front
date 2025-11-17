
import DashboardLayout from "../../../layout/DashboardLayout";

const MOCK_EXAMENES = [
  { id: 1, empleado: "Juan Pérez", dni: "30123456", fecha: "2025-03-01" },
  { id: 2, empleado: "María López", dni: "28999888", fecha: "2025-02-20" },
];

export default function DocumentacionExamenes() {
  return (
    <DashboardLayout role="user">
      <h2 className="text-xl font-semibold mb-4">
        Documentación de exámenes
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Descargá los PDF de exámenes de tus empleados.
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-800">
              <th className="py-2 text-left">Empleado</th>
              <th className="py-2 text-left">DNI</th>
              <th className="py-2 text-left">Fecha</th>
              <th className="py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EXAMENES.map((ex) => (
              <tr key={ex.id} className="border-b border-slate-800/60">
                <td className="py-2">{ex.empleado}</td>
                <td className="py-2">{ex.dni}</td>
                <td className="py-2">{ex.fecha}</td>
                <td className="py-2 text-right">
                  <button className="text-xs px-3 py-1 bg-slate-800 rounded hover:bg-slate-700">
                    Descargar PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
