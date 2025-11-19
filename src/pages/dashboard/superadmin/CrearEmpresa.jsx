import { useState } from "react";
import { TextInput, Button, Paper, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CrearEmpresa() {
  const navigate = useNavigate();

  // ======================================================
  // BACKEND URL universal (local + Vercel + Render)
  // ======================================================
  const API =
    import.meta.env.VITE_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:4000";

  const BASE = API.replace(/\/$/, "");

  const [form, setForm] = useState({
    empresa: "",
    cuit: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${BASE}/api/admin/crear-empresa`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error creando empresa");

      setMsg({ type: "ok", text: "Empresa creada correctamente" });

      setTimeout(() => navigate("/dashboard/superadmin"), 1000);

    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 sm:p-6 md:p-10 text-white">
      <Paper shadow="md" p="xl" radius="lg" className="max-w-xl mx-auto bg-slate-800">
        <Title order={2} className="mb-6 text-center text-white">
          Registrar Empresa
        </Title>

        <TextInput
          label="Razón Social"
          name="empresa"
          value={form.empresa}
          onChange={handleChange}
          required
          mb="sm"
        />

        <TextInput
          label="CUIT"
          name="cuit"
          value={form.cuit}
          onChange={handleChange}
          required
          mb="sm"
        />

        {msg && (
          <p
            className={`text-center mb-3 ${
              msg.type === "ok" ? "text-green-400" : "text-red-400"
            }`}
          >
            {msg.text}
          </p>
        )}

        <Button fullWidth loading={loading} onClick={handleSubmit}>
          Guardar
        </Button>
      </Paper>

      <div className="h-10"></div>
    </div>
  );
}
