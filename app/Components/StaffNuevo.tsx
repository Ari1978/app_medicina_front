"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../Components/AuthContext";
import { useRouter } from "next/navigation";

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

export default function StaffNuevo() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    role: "",
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    superadmin: false,
    permisos: [] as string[],
  });

  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // 🔥 Protección
  useEffect(() => {
    if (!loading) {
      if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
        router.replace("/login");
      }
    }
  }, [loading, user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const togglePermiso = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(perm)
        ? prev.permisos.filter((p) => p !== perm)
        : [...prev.permisos, perm],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const { role, username, password, nombre, apellido, permisos, superadmin } = form;

    if (!role || !username || !password || !nombre || !apellido) {
      return setMsg({ type: "err", text: "Todos los campos son obligatorios" });
    }

    if (role === "staff" && permisos.length === 0) {
      return setMsg({ type: "err", text: "Seleccione al menos 1 permiso" });
    }

    setSaving(true);
    try {
      // 🔥 CORRECTO PARA RENDER + VERCEL
      const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

      if (!base) {
        throw new Error("Falta NEXT_PUBLIC_BACKEND_URL en Vercel");
      }

      const endpoint =
        role === "admin"
          ? "/api/admin/crear-admin"
          : "/api/admin/crear-staff";

      const payload =
        role === "admin"
          ? { username, password, nombre, apellido, superadmin }
          : { username, password, nombre, apellido, permisos };

      const res = await fetch(`${base}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear usuario");

      setMsg({
        type: "ok",
        text:
          role === "admin"
            ? "Admin creado correctamente"
            : "Staff creado correctamente",
      });

      setForm({
        role: "",
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        superadmin: false,
        permisos: [],
      });
    } catch (err: any) {
      setMsg({ type: "err", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return <p className="text-white text-center mt-10">Cargando...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Staff / Admin</h2>

      {msg && (
        <div
          className={`p-3 mb-4 text-center rounded ${
            msg.type === "ok"
              ? "bg-green-700/40 text-green-300"
              : "bg-red-700/40 text-red-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="p-3 rounded bg-white/20 border border-white/30 text-white"
        >
          <option value="">Seleccionar Rol</option>
          <option value="admin" className="text-gray-900 bg-white">
            ADMIN
          </option>
          <option value="staff" className="text-gray-900 bg-white">
            STAFF
          </option>
        </select>

        <input
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
        />

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
        />

        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
        />

        {/* Superadmin solo lo crea superadmin */}
        {form.role === "admin" && user.role === "superadmin" && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="superadmin"
              checked={form.superadmin}
              onChange={handleChange}
            />
            Dar privilegios de SuperAdmin
          </label>
        )}

        {/* Permisos del staff */}
        {form.role === "staff" && (
          <div className="bg-white/10 p-3 rounded border border-white/20">
            <p className="mb-2 font-semibold">Permisos del Staff:</p>
            {PERMISOS.map((p) => (
              <label key={p} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={form.permisos.includes(p)}
                  onChange={() => togglePermiso(p)}
                />
                {p.toUpperCase()}
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Crear"}
        </button>
      </form>
    </div>
  );
}
