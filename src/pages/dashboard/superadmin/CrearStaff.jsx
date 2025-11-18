import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  MultiSelect,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PERMISOS = [
  "marketing",
  "rrhh",
  "saludMental",
  "turnos",
  "examenes",
  "visitas",
  "contaduria",
  "medico",
];

export default function CrearStaff() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    permisos: [],
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${API}/api/superadmin/crear-staff`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg({ type: "ok", text: "Staff creado correctamente" });
      setTimeout(() => navigate("/dashboard/superadmin"), 800);
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 sm:p-6 md:p-10 text-white">

      <Paper p="xl" className="max-w-xl mx-auto bg-slate-800 shadow-xl">
        <Title order={2} className="mb-6 text-center text-white">
          Crear Staff
        </Title>

        <TextInput
          label="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          mb="sm"
        />

        <PasswordInput
          label="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          mb="sm"
        />

        <TextInput
          label="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          mb="sm"
        />

        <TextInput
          label="Apellido"
          value={form.apellido}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          mb="sm"
        />

        <MultiSelect
          label="Permisos"
          data={PERMISOS}
          value={form.permisos}
          onChange={(value) => setForm({ ...form, permisos: value })}
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
          Crear Staff
        </Button>
      </Paper>

      <div className="h-10"></div>
    </div>
  );
}
