import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";

export default function LoginSuperadmin() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      // 🔥 Login con el rol "superadmin"
      const redirect = await login("superadmin", username, password);

      // 🔥 Redirección igual que Staff
      window.location.href = redirect;
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Paper shadow="md" p="xl" radius="lg" className="w-full max-w-md">
        <Title order={2} className="text-center mb-6">
          Acceso SuperAdmin
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

        {error && <p className="text-red-600 text-center">{error}</p>}

        <Button fullWidth loading={loading} onClick={handleSubmit} mt="md">
          Ingresar
        </Button>
      </Paper>
    </div>
  );
}
