// src/pages/register/ValidarCuit.jsx
import { useState } from "react";
import { API, buildUrl } from "../../api";

export default function ValidarCuit() {
  const [cuit, setCuit] = useState("");
  const [msg, setMsg] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  const validar = async () => {
    setMsg(null);
    setEmpresa(null);

    try {
      const res = await fetch(buildUrl("/api/user/check-cuit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cuit }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "No se pudo validar el CUIT");
      }

      setEmpresa(data);
      setMsg({ type: "ok", text: "Empresa habilitada para registrarse" });
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Validar CUIT</h1>

      <input
        className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm w-full max-w-xs"
        placeholder="Ingresá el CUIT"
        value={cuit}
        onChange={(e) => setCuit(e.target.value)}
      />

      <button
        onClick={validar}
        className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-semibold"
      >
        Validar
      </button>

      {msg && (
        <p
          className={`mt-3 text-sm ${
            msg.type === "err" ? "text-red-400" : "text-green-400"
          }`}
        >
          {msg.text}
        </p>
      )}

      {empresa && (
        <div className="mt-4 bg-slate-800 border border-slate-700 rounded p-3 text-sm w-full max-w-md">
          <p>Empresa: {empresa.empresa}</p>
          <p>CUIT: {empresa.cuit}</p>

          <a
            className="block mt-4 text-blue-400 underline"
            href={`/register?cuit=${cuit}`}
          >
            Continuar con registro →
          </a>
        </div>
      )}
    </div>
  );
}
