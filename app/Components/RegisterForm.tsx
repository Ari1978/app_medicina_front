"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  nombre: string;
  cuit: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [cuit, setCuit] = useState("");
  const [cuitValid, setCuitValid] = useState(false);
  const [empresaData, setEmpresaData] = useState<{
    nombreEmpresa: string;
    contacto?: { nombre?: string; email?: string };
  } | null>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: "",
    cuit: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  // Backend
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "";

  if (!API_URL) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL");

  // =========================================================
  // 🔵 VALIDAR CUIT (endpoint real: /api/user/check-cuit)
  // =========================================================
  const handleCheckCuit = async () => {
    setMsgError(null);

    if (!/^\d{11}$/.test(cuit)) {
      setMsgError("El CUIT debe contener exactamente 11 números");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/check-cuit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cuit }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message || "CUIT no habilitado");
        return;
      }

      // backend retorna: cuit, nombre (empresa), email
      setCuitValid(true);
      setEmpresaData({
        nombreEmpresa: data.nombre,
        contacto: { nombre: data.nombre, email: data.email },
      });

      setFormData({
        ...formData,
        cuit: data.cuit,
        nombre: data.nombre,
        email: data.email,
      });
    } catch (err) {
      setMsgError(
        err instanceof Error ? err.message : "Error validando CUIT"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // 🔵 REGISTRO (endpoint real: /api/user/register)
  // =========================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgError(null);
    setMsgSuccess(null);

    const { nombre, email, password } = formData;

    if (!nombre.trim()) return setMsgError("El nombre es obligatorio");
    if (!/\S+@\S+\.\S+/.test(email))
      return setMsgError("El email no es válido");
    if (password.length < 6)
      return setMsgError("La contraseña debe tener mínimo 6 caracteres");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          empresa: empresaData?.nombreEmpresa || "",
          cuit: formData.cuit,
          contacto: {
            nombre: formData.nombre,
            email: formData.email,
          },
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.message || "Error al registrar usuario");
        return;
      }

      setMsgSuccess("✅ Registro exitoso. Ahora podés iniciar sesión.");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setMsgError(
        err instanceof Error ? err.message : "Error en registro"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // 🔵 UI
  // =========================================================
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] py-20">

      {!cuitValid ? (
        // ---------------------------------------
        // VALIDAR CUIT
        // ---------------------------------------
        <div className="w-full max-w-md p-8 flex flex-col gap-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Validar CUIT</h2>

          {msgError && <p className="text-red-400 text-center">{msgError}</p>}

          <input
            placeholder="CUIT"
            value={cuit}
            onChange={(e) => setCuit(e.target.value.replace(/\D/g, ""))}
            className="p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/70"
          />

          <button
            onClick={handleCheckCuit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Validando..." : "Validar CUIT"}
          </button>
        </div>
      ) : (
        // ---------------------------------------
        // CREAR CUENTA
        // ---------------------------------------
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 flex flex-col gap-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-4">Crear Cuenta</h2>

          {msgError && (
            <p className="text-red-400 bg-red-900/30 p-2 rounded-md text-center text-sm">
              {msgError}
            </p>
          )}

          {msgSuccess && (
            <p className="text-green-400 bg-green-900/30 p-2 rounded-md text-center text-sm">
              {msgSuccess}
            </p>
          )}

          <input
            name="nombre"
            placeholder="Nombre de contacto"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="p-3 rounded-xl bg-white/20 text-white"
          />

          <input
            name="cuit"
            placeholder="CUIT"
            value={formData.cuit}
            disabled
            className="p-3 rounded-xl bg-white/20 text-white"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled
            className="p-3 rounded-xl bg-white/20 text-white"
          />

          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-3 rounded-xl bg-white/20 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      )}
    </div>
  );
}
