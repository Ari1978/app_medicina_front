import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";

export default function LoginAdmin() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // 🔥 Admin y SuperAdmin entran por acá
      const redirect = await login("admin", username, password);

      // 🔥 Redirección EXACTAMENTE como tu LoginStaff
      window.location.href = redirect;
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-700 px-4">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">
        <Title order={2} className="text-center mb-6">
          Acceso Administrador ASMEL
        </Title>

        <TextInput
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <PasswordInput
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="sm"
        />

        {error && (
          <p className="text-red-600 text-center text-sm mt-2">{error}</p>
        )}

        <Button fullWidth loading={loading} onClick={handleSubmit} mt="md">
          Ingresar
        </Button>
      </Paper>
    </div>
  );
}
