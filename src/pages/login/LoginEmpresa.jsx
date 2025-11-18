// src/pages/login/LoginEmpresa.jsx
import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginEmpresa() {
  const [cuit, setCuit] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const redirectPath = await login("user", cuit, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-700 px-4">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">

        {/* ICONO + TÍTULO */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <img
              src="https://www.asmel.com/wp-content/themes/bst-master/img/logo_header2.png"
              alt="ASMEL Logo"
              className="h-10"
            />
          </div>
          <Title order={2} className="mt-3">
            Acceso Empresas ASMEL
          </Title>
        </div>

        {/* FORMULARIO */}
        <TextInput
          label="CUIT"
          placeholder="Ingresá el CUIT"
          value={cuit}
          onChange={(e) => setCuit(e.target.value)}
          required
          mb="sm"
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Ingresá la contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mb="md"
        />

        {error && (
          <p className="text-red-500 text-center text-sm mb-3">{error}</p>
        )}

        <Button fullWidth loading={loading} onClick={handleLogin}>
          Ingresar
        </Button>

        {/* registrar */}
        <p className="text-center text-sm mt-4 text-gray-200">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300">
            Crear cuenta
          </Link>
        </p>

        {/* volver al inicio */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-gray-300 hover:text-white underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </Paper>
    </div>
  );
}
