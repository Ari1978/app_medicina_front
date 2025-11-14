"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type Role = "user" | "staff" | "admin" | "superadmin";

interface User {
  _id: string;
  id: string;
  nombre?: string;
  apellido?: string;
  cuit?: string;
  email?: string;
  username?: string;
  permisos?: string[];
  role: Role;
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

  const base = process.env.NEXT_PUBLIC_BACKEND_URL!;
  if (!base) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en .env");

  // ----------------------------------------------------
  // NORMALIZAR USUARIO (fix id / _id)
  // ----------------------------------------------------
  const normalizeUser = (u: any): User => ({
    ...u,
    _id: u._id || u.id,
    id: u._id || u.id,
  });

  // ----------------------------------------------------
  // LOGIN GENERAL
  // ----------------------------------------------------
  const loginRequest = async (endpoint: string, body: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${base}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 importantísimo
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Credenciales inválidas");

      const u = normalizeUser(data.user);
      setUser(u);

      redirectByRole(u.role, u.permisos);
    } catch (err) {
      console.error("❌ Error login:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // LOGINs por tipo
  // ----------------------------------------------------
  const loginUser  = async (cuit: string, password: string) =>
    loginRequest(`/api/user/login`, { cuit, password });

  const loginStaff = async (username: string, password: string) =>
    loginRequest(`/api/staff/login`, { username, password });

  const loginAdmin = async (username: string, password: string) =>
    loginRequest(`/api/admin/login`, { username, password });

  // ----------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------
  const logout = async () => {
    if (!user) return;

    const url =
      user.role === "user"
        ? `/api/user/logout`
        : user.role === "staff"
        ? `/api/staff/logout`
        : `/api/admin/logout`;

    await fetch(`${base}${url}`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.replace("/login");
  };

  // ----------------------------------------------------
  // AUTOLOGIN (al refrescar el navegador)
  // ----------------------------------------------------
  useEffect(() => {
    const autologin = async () => {
      try {
        const candidates = [
          `/api/user/me`,
          `/api/staff/me`,
          `/api/admin/me`,
        ];

        for (const endpoint of candidates) {
          const res = await fetch(`${base}${endpoint}`, {
            credentials: "include",
          });

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
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    autologin();
  }, []);

  // ----------------------------------------------------
  // REDIRECCIÓN POR ROL
  // ----------------------------------------------------
  const redirectByRole = (role: Role, permisos?: string[]) => {
    if (role === "user") return router.replace("/PanelUsuario");

    if (role === "staff") {
      if (permisos?.includes("examenes")) return router.replace("/agendaTurno");
      if (permisos?.includes("marketing")) return router.replace("/panelMarketing");
      if (permisos?.includes("rrhh")) return router.replace("/panelRRHH");
      if (permisos?.includes("saludMental")) return router.replace("/panelSaludMental");
      if (permisos?.includes("turnos")) return router.replace("/panelTurnos");
      if (permisos?.includes("visitas")) return router.replace("/panelVisitas");
      if (permisos?.includes("contaduria")) return router.replace("/panelContaduria");
      if (permisos?.includes("medico")) return router.replace("/panelMedico");
      return router.replace("/panelStaff");
    }

    // Admin / Superadmin
    return router.replace("/panelSuperAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        loginStaff,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ----------------------------------------------------
// HOOK
// ----------------------------------------------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
