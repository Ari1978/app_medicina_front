"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type Role = "user" | "staff" | "admin" | "superadmin";

interface User {
  _id?: string;
  id?: string;
  nombre?: string;
  apellido?: string;
  cuit?: string;
  email?: string;
  username?: string;
  role: Role;
  permisos?: string[];
  empresa?: string;
  contacto?: {
    nombre?: string;
    email?: string;
    telefono?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (cuit: string, password: string) => Promise<void>;
  loginStaff: (username: string, password: string) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 URL del backend (sin fallback a localhost)
  const base = process.env.NEXT_PUBLIC_BACKEND_URL!;
  // Si no existe, error inmediato:
  if (!base) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");

  // ------------------------------------------
  // 🔥 Normalización universal de usuario
  // ------------------------------------------
  const normalizeUser = (u: any): User => ({
    ...u,
    _id: u._id || u.id,
    id: u._id || u.id,
  });

  // ------------------------------------------
  // 🔐 LOGIN GENÉRICO
  // ------------------------------------------
  const loginRequest = async (url: string, body: any) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Credenciales inválidas");

      const u = normalizeUser(data.user);
      setUser(u);

      redirectByRole(u.role, u.permisos);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // 🔐 LOGIN ESPECÍFICOS
  // ------------------------------------------
  const loginUser = async (cuit: string, password: string) =>
    loginRequest(`${base}/api/user/login`, { cuit, password });

  const loginStaff = async (username: string, password: string) =>
    loginRequest(`${base}/api/staff/login`, { username, password });

  const loginAdmin = async (username: string, password: string) =>
    loginRequest(`${base}/api/admin/login`, { username, password });

  // ------------------------------------------
  // 🔓 LOGOUT
  // ------------------------------------------
  const logout = async () => {
    if (!user) return;

    const logoutURL =
      user.role === "user"
        ? `${base}/api/user/logout`
        : user.role === "staff"
        ? `${base}/api/staff/logout`
        : `${base}/api/admin/logout`;

    await fetch(logoutURL, { method: "POST", credentials: "include" });

    setUser(null);
    router.replace("/login");
  };

  // ------------------------------------------
  // 🔄 AUTO-LOGIN (CHECK COOKIE)
  // ------------------------------------------
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);

        const endpoints = [
          `${base}/api/user/me`,
          `${base}/api/staff/me`,
          `${base}/api/admin/me`,
        ];

        for (const endpoint of endpoints) {
          const res = await fetch(endpoint, { credentials: "include" });
          if (res.ok) {
            const data = await res.json();
            const u = normalizeUser(data.user);

            setUser(u);

            if (pathname === "/login") {
              redirectByRole(u.role, u.permisos);
            }

            setLoading(false);
            return;
          }
        }

        setUser(null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // ------------------------------------------
  // ➡️ REDIRECCIÓN POR ROL Y PERMISOS
  // ------------------------------------------
  const redirectByRole = (role: Role, permisos?: string[]) => {
    if (role === "user") {
      router.replace("/PanelUsuario");
      return;
    }

    if (role === "staff") {
      if (permisos?.includes("examenes")) router.replace("/agendaTurno");
      else if (permisos?.includes("marketing")) router.replace("/panelMarketing");
      else if (permisos?.includes("rrhh")) router.replace("/panelRRHH");
      else if (permisos?.includes("saludMental")) router.replace("/panelSaludMental");
      else if (permisos?.includes("turnos")) router.replace("/panelTurnos");
      else if (permisos?.includes("visitas")) router.replace("/panelVisitas");
      else if (permisos?.includes("contaduria")) router.replace("/panelContaduria");
      else if (permisos?.includes("medico")) router.replace("/panelMedico");
      else router.replace("/panelStaff");
      return;
    }

    router.replace("/panelSuperAdmin");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, loginStaff, loginAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
