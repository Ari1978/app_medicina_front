
import DashboardLayout from "../../../layout/DashboardLayout";

const MOCK_FACTURAS = [
  { id: 1, numero: "0001-00001234", periodo: "Enero 2025", estado: "Pagada" },
  { id: 2, numero: "0001-00001235", periodo: "Febrero 2025", estado: "Pendiente" },
];

export default function FacturacionEmpresa() {
  return (
    <DashboardLayout role="user">
      <h2 className="text-xl font-semibold mb-4">Facturación</h2>
      <p className="text-xs text-slate-400 mb-4">
        Descargá tus facturas y controlá el estado de tu abono.
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-800">
              <th className="py-2 text-left">Número</th>
              <th className="py-2 text-left">Período</th>
              <th className="py-2 text-left">Estado</th>
              <th className="py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FACTURAS.map((f) => (
              <tr key={f.id} className="border-b border-slate-800/60">
                <td className="py-2">{f.numero}</td>
                <td className="py-2">{f.periodo}</td>
                <td className="py-2">{f.estado}</td>
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
