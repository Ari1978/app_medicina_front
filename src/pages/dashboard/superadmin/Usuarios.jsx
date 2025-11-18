import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Usuarios() {
  const API = import.meta.env.VITE_BACKEND_URL;

  const [usuarios, setUsuarios] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [msg, setMsg] = useState("");

  // ===============================
  // CARGAR USUARIOS
  // ===============================
  useEffect(() => {
    (async () => {
      const r = await fetch(`${API}/api/admin/listar-usuarios`, {
        credentials: "include",
      });

      const data = await r.json();
      console.log("RESPUESTA BACK:", data);

      setUsuarios(Array.isArray(data) ? data : data.usuarios ?? []);
    })();
  }, []);

  // ===============================
  // LEER EXCEL
  // ===============================
  const handleExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMsg("");
    setExcelData([]);

    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      setExcelData(data);
    };

    reader.readAsBinaryString(file);
  };

  // ===============================
  // IMPORTAR EXCEL
  // ===============================
  const importarUsuarios = async () => {
    setLoadingExcel(true);
    setMsg("");

    try {
      const r = await fetch(`${API}/api/admin/importar-usuarios`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarios: excelData }),
      });

      const data = await r.json();

      if (!r.ok) {
        setMsg(data.message || "Error al importar usuarios.");
      } else {
        setMsg(
          `Importación completada: ${data.creados} creados, ${data.existentes} existentes.`
        );
      }
    } catch (e) {
      console.log(e);
      setMsg("Error al procesar el archivo.");
    }

    setLoadingExcel(false);
  };

  // ===============================
  // RENDER
  // ===============================
  if (!usuarios) return <p className="text-white p-6">Cargando…</p>;

  return (
    <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 sm:p-6 md:p-10 text-white">

      <h1 className="text-2xl font-bold mb-6">Usuarios del sistema</h1>

      {/* ==========================
          IMPORTAR EXCEL
      ========================== */}
      <div className="mb-8 bg-slate-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Importar usuarios desde Excel</h2>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcel}
          className="mb-3 text-white"
        />

        {excelData.length > 0 && (
          <div className="mb-4 bg-slate-700 p-3 rounded">
            <p className="mb-2 text-sm">Vista previa ({excelData.length} filas):</p>
            <pre className="overflow-auto text-xs max-h-48">
              {JSON.stringify(excelData.slice(0, 5), null, 2)}
            </pre>
          </div>
        )}

        <button
          disabled={excelData.length === 0 || loadingExcel}
          onClick={importarUsuarios}
          className="px-4 py-2 bg-blue-600 disabled:bg-blue-900 hover:bg-blue-700 rounded-lg"
        >
          {loadingExcel ? "Importando..." : "Importar usuarios"}
        </button>

        {msg && <p className="mt-3 text-sm text-cyan-300">{msg}</p>}
      </div>

      {/* ==========================
          TABLA USUARIOS
      ========================== */}
      <div className="overflow-x-auto bg-slate-800 p-4 rounded-xl shadow-lg">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Email/Usuario</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u._id} className="border-b border-slate-700">
                <td className="p-3">{u.nombre || "-"}</td>
                <td className="p-3">{u.apellido || "-"}</td>
                <td className="p-3">{u.username || u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-10"></div>
    </div>
  );
}
