"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import Link from "next/link";

type UserType = "user" | "staff" | "admin";

export default function LoginForm() {
  const { loginUser, loginStaff, loginAdmin } = useAuth();

  const [userType, setUserType] = useState<UserType>("user");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (userType === "user") {
        await loginUser(identifier.trim(), password);
      } else if (userType === "staff") {
        await loginStaff(identifier.trim(), password);
      } else {
        await loginAdmin(identifier.trim(), password);
      }
      // Redirección automática desde AuthContext
    } catch (err: any) {
      console.error("❌ Error login:", err);

      const msg =
        err?.message ||
        err?.response?.data?.message ||
        "Error al iniciar sesión";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-gray-900/80 text-white border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Tipo de usuario */}
        <div>
          <label className="block mb-1 font-medium">Ingresar como:</label>
          <select
            className="w-full border p-2 rounded bg-gray-800 text-white"
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
          >
            <option value="user">Usuario (Empresa)</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin / SuperAdmin</option>
          </select>
        </div>

        {/* CUIT o Username */}
        <div>
          <label className="block mb-1 font-medium">
            {userType === "user" ? "CUIT" : "Usuario (Username)"}
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded bg-gray-800 text-white"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            className="w-full border p-2 rounded bg-gray-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-center font-medium">{error}</p>}

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* Registro solo para empresas */}
        {userType === "user" && (
          <p className="text-center text-sm mt-4 text-gray-300">
            ¿No tenés una cuenta?{" "}
            <Link
              href="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Registrate aquí
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
