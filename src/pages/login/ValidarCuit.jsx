
import { useState } from "react";

export default function ValidarCuit() {
  const API = import.meta.env.VITE_BACKEND_URL;

  const [cuit, setCuit] = useState("");
  const [msg, setMsg] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  const validar = async () => {
    setMsg(null);
    setEmpresa(null);

    const res = await fetch(`${API}/api/auth/validar-cuit/${cuit}`);
    const data = await res.json();

    if (!res.ok) {
      setMsg({ type: "err", text: data.message });
      return;
    }

    setMsg({ type: "ok", text: "CUIT válido. Puede registrarse." });
    setEmpresa(data.empresa);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl mb-4">Validar CUIT</h1>

      <input
        type="text"
        className="p-2 rounded text-black"
        placeholder="CUIT"
        value={cuit}
        onChange={(e) => setCuit(e.target.value)}
      />

      <button
        onClick={validar}
        className="mt-4 bg-blue-600 px-4 py-2 rounded"
      >
        Validar CUIT
      </button>

      {msg && (
        <p
          className={`mt-3 ${
            msg.type === "ok" ? "text-green-400" : "text-red-400"
          }`}
        >
          {msg.text}
        </p>
      )}

      {empresa && (
        <div className="mt-6 bg-slate-800 p-4 rounded">
          <p>Empresa: {empresa.empresa}</p>
          <p>Contacto: {empresa.contacto.nombre}</p>

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
