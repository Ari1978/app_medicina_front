import { useState } from "react";
import { TextInput, Button, Paper, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CrearEmpresa() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const [form, setForm] = useState({
    empresa: "",
    cuit: "",
    contactoNombre: "",
    contactoEmail: "",
    password: "temporal123",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${API}/api/admin/crear-empresa`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // <--- ahora sí todo correcto
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
    <div className="min-h-screen p-6 text-white bg-slate-900">
      <Paper shadow="md" p="xl" radius="lg" className="max-w-xl mx-auto">
        <Title order={2} className="mb-6 text-center">
          Crear Empresa
        </Title>

        <TextInput
          label="Nombre de la empresa"
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

        <TextInput
          label="Nombre del contacto"
          name="contactoNombre"
          value={form.contactoNombre}
          onChange={handleChange}
          required
          mb="sm"
        />

        <TextInput
          label="Email del contacto"
          name="contactoEmail"
          value={form.contactoEmail}
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
          Crear Empresa
        </Button>
      </Paper>
    </div>
  );
}
