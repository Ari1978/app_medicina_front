import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CrearAdmin() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      // 🔥 RUTA CORRECTA
      const res = await fetch(`${API}/api/admin/crear-admin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg({ type: "ok", text: "Admin creado correctamente" });
      setTimeout(() => navigate("/dashboard/superadmin"), 1000);
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 text-white bg-slate-900">
      <Paper p="xl" radius="lg" className="max-w-xl mx-auto">
        <Title order={2} className="mb-6 text-center">
          Crear Admin
        </Title>

        <TextInput
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          mb="sm"
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          mb="sm"
        />

        <TextInput
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          mb="sm"
        />

        <TextInput
          label="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
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
          Crear Admin
        </Button>
      </Paper>
    </div>
  );
}
