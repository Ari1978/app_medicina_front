// src/pages/login/LoginSuperAdmin.jsx
import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginSuperadmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError("Completá usuario y contraseña");
      return;
    }

    setLoading(true);

    try {
      // entra por /api/admin/login, el backend decide si es superadmin
      const redirect = await login("admin", cleanUser, cleanPass);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-700 px-4">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">
        <Title order={2} className="text-center mb-6">
          Acceso SuperAdmin ASMEL
        </Title>

        <TextInput
          label="Usuario"
          placeholder="Ingresá tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={onKeyPress}
          required
          mb="sm"
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Ingresá la contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={onKeyPress}
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
