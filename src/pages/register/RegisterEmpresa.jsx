// src/pages/register/RegisterEmpresa.jsx
import { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Divider,
} from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { API, buildUrl } from "../../api";

export default function RegisterEmpresa() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [cuit, setCuit] = useState("");

  const [empresaData, setEmpresaData] = useState(null);

  const [form, setForm] = useState({
    password: "",
    contactoNombre: "",
    contactoEmail: "",
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si viene ?cuit= desde ValidarCuit, lo tomamos
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cuitFromQuery = params.get("cuit");
    if (cuitFromQuery) setCuit(cuitFromQuery);
  }, [location.search]);

  // ---------------------------------------------
  // PASO 1: Validar CUIT
  // ---------------------------------------------
  const handleCheckCuit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(buildUrl("/api/user/check-cuit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cuit }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEmpresaData(data);

      setForm((prev) => ({
        ...prev,
        contactoNombre: data.nombre || "",
        contactoEmail: data.email || "",
      }));

      setStep(2);
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }

    setLoading(false);
  };

  // ---------------------------------------------
  // PASO 2: Registrar empresa
  // ---------------------------------------------
  const handleRegister = async () => {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(buildUrl("/api/user/register"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cuit,
          password: form.password,
          contacto: {
            nombre: form.contactoNombre,
            email: form.contactoEmail,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg({ type: "ok", text: "Registro exitoso. Redirigiendo..." });

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-700">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">
        <Title order={2} className="text-center mb-6">
          Registro de Empresa
        </Title>

        {/* ==============================
            PASO 1: VALIDAR CUIT
        =============================== */}
        {step === 1 && (
          <>
            <TextInput
              label="CUIT"
              placeholder="Ingresá tu CUIT"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              required
            />

            {msg && (
              <p
                className={`mt-3 text-center ${
                  msg.type === "err" ? "text-red-600" : "text-green-500"
                }`}
              >
                {msg.text}
              </p>
            )}

            <Button
              fullWidth
              loading={loading}
              onClick={handleCheckCuit}
              mt="md"
            >
              Validar CUIT
            </Button>
          </>
        )}

        {/* ==============================
            PASO 2: FORMULARIO REGISTRO
        =============================== */}
        {step === 2 && (
          <>
            <Divider mb="lg" label={`Empresa habilitada`} />

            <TextInput
              label="Email"
              value={form.contactoEmail}
              onChange={(e) =>
                setForm({ ...form, contactoEmail: e.target.value })
              }
              required
            />

            <TextInput
              label="Nombre del contacto"
              value={form.contactoNombre}
              onChange={(e) =>
                setForm({ ...form, contactoNombre: e.target.value })
              }
              required
              mt="sm"
            />

            <PasswordInput
              label="Contraseña nueva"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
              mt="sm"
            />

            {msg && (
              <p
                className={`mt-3 text-center ${
                  msg.type === "err" ? "text-red-600" : "text-green-500"
                }`}
              >
                {msg.text}
              </p>
            )}

            <Button
              fullWidth
              loading={loading}
              onClick={handleRegister}
              mt="lg"
            >
              Completar registro
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}
