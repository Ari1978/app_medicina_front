// src/pages/login/LoginEmpresa.jsx
import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      // 🔥 Usa el login del AuthContext
      const redirectPath = await login("user", cuit, password);

      // 🔥 Redirección según el rol devuelto
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">
        <Title order={2} className="text-center mb-6">
          Acceso Empresas ASMEL
        </Title>

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
          <p className="text-red-600 text-center text-sm mb-3">{error}</p>
        )}

        <Button fullWidth loading={loading} onClick={handleLogin}>
          Ingresar
        </Button>
      </Paper>
    </div>
  );
}
