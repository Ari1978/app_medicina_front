"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UsuarioForm {
  empresa: string;
  cuit: string;
  contactoNombre: string;
  contactoEmail: string;
  password: string;
}

export default function CrearUsuariosAutorizados() {
  const router = useRouter();

  const [form, setForm] = useState<UsuarioForm>({
    empresa: "",
    cuit: "",
    contactoNombre: "",
    contactoEmail: "",
    password: "temporal123",
  });

  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [excelMsg, setExcelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

  // ----------------------------------------------------------
  // INPUTS
  // ----------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----------------------------------------------------------
  // CREAR USUARIO
  // ----------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const { empresa, cuit, contactoNombre, contactoEmail, password } = form;

    if (!empresa.trim() || !/^\d{11}$/.test(cuit) || !contactoNombre.trim() || !contactoEmail.trim()) {
      return setMsg({
        type: "err",
        text: "Todos los campos son obligatorios y el CUIT debe tener 11 dígitos.",
      });
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/usuario-autorizado/crear`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          empresa: empresa.trim(),
          cuit: cuit.trim(),
          contacto: {
            nombre: contactoNombre.trim(),
            email: contactoEmail.trim(),
          },
          password,
        }),
      });

      // ⛔ SI CADUCA SESIÓN → REDIRIGIR
      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Error al crear usuario");

      setMsg({ type: "ok", text: "Usuario autorizado creado correctamente." });

      setForm({
        empresa: "",
        cuit: "",
        contactoNombre: "",
        contactoEmail: "",
        password: "temporal123",
      });
    } catch (err: any) {
      setMsg({ type: "err", text: err.message || "Error desconocido" });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // IMPORTAR EXCEL
  // ----------------------------------------------------------
  const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcelFile(e.target.files?.[0] || null);
    setExcelMsg(null);
  };

  const handleImportExcel = async () => {
    if (!excelFile) {
      return setExcelMsg({ type: "err", text: "Seleccioná un archivo primero." });
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", excelFile);

      const res = await fetch(`${API_URL}/api/usuario-autorizado/importar`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      // ⛔ SESIÓN EXPIRADA → LOGIN
      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Error al importar Excel");

      setExcelMsg({ type: "ok", text: "Archivo Excel importado correctamente." });
      setExcelFile(null);
    } catch (err: any) {
      setExcelMsg({ type: "err", text: err.message || "Error desconocido" });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // UI
  // ----------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Usuario Autorizado</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {msg && (
          <p className={`p-2 rounded text-center ${msg.type === "ok" ? "bg-green-700" : "bg-red-700"}`}>
            {msg.text}
          </p>
        )}

        <input
          name="empresa"
          placeholder="Empresa"
          value={form.empresa}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <input
          name="cuit"
          placeholder="CUIT (11 dígitos)"
          value={form.cuit}
          onChange={(e) => setForm((f) => ({ ...f, cuit: e.target.value.replace(/\D/g, "") }))}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <input
          name="contactoNombre"
          placeholder="Nombre del contacto"
          value={form.contactoNombre}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <input
          name="contactoEmail"
          placeholder="Email del contacto"
          type="email"
          value={form.contactoEmail}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Agregando..." : "Agregar Usuario"}
        </button>
      </form>

      {/* IMPORTAR EXCEL */}
      <div className="flex flex-col gap-3">
        {excelMsg && (
          <p className={`p-2 rounded text-center ${excelMsg.type === "ok" ? "bg-green-700" : "bg-red-700"}`}>
            {excelMsg.text}
          </p>
        )}

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleExcelChange}
          className="p-2 rounded bg-gray-800"
        />

        <button
          onClick={handleImportExcel}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 p-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Importando..." : "Importar Excel"}
        </button>
      </div>
    </div>
  );
}
