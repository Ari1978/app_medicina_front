"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type Role = "user" | "staff" | "admin" | "superadmin";

/* ============================================================
   🟦 USER → TIPO COMPLETO DEVUELTO POR TU BACKEND
   ============================================================ */
export interface User {
  _id: string;

  // Empresa (solo para usuarios CUIT)
  empresa?: string;

  // Datos personales
  nombre?: string;
  apellido?: string;
  cuit?: string;

  // Email general
  email?: string;

  // Contacto usado por empresas
  contacto?: {
    nombre?: string;
    email?: string;
    telefono?: string;
  };

  // Rol
  role: Role;

  // Permisos del STAFF
  permisos?: string[];
}

/* ============================================================
   📌 CONTEXTO
   ============================================================ */
interface AuthContextType {
  user: User | null;
  loading: boolean;

  loginUser: (cuit: string, password: string) => Promise<void>;
  loginStaff: (username: string, password: string) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ============================================================
   🔥 URL GLOBAL DEL BACKEND
   ============================================================ */
const API = (process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:4000"
).replace(/\/$/, "");

/* ============================================================
   🟩 PROVIDER
   ============================================================ */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ============================================================
     🔥 Cargar sesión automáticamente al entrar
     ============================================================ */
  const checkSession = async () => {
    try {
      const res = await fetch(`${API}/api/user/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    }
  };

  /* ============================================================
     ⏳ Carga inicial
     ============================================================ */
  useEffect(() => {
    checkSession().finally(() => setLoading(false));
  }, []);

  /* ============================================================
     🔐 LOGIN USER (empresa)
     ============================================================ */
  const loginUser = async (cuit: string, password: string) => {
    const res = await fetch(`${API}/api/user/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuit, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error en login");

    setUser(data.user);

    router.replace("/panelUsuario");
  };

  /* ============================================================
     🔐 LOGIN STAFF
     ============================================================ */
  const loginStaff = async (username: string, password: string) => {
    const res = await fetch(`${API}/api/staff/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error en login staff");

    setUser(data.user);

    router.replace("/panelStaff");
  };

  /* ============================================================
     🔐 LOGIN ADMIN / SUPERADMIN
     ============================================================ */
  const loginAdmin = async (username: string, password: string) => {
    const res = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error en login admin");

    setUser(data.user);

    router.replace("/panelSuperAdmin");
  };

  /* ============================================================
     🚪 LOGOUT
     ============================================================ */
  const logout = async () => {
    try {
      await fetch(`${API}/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    setUser(null);
    router.replace("/login");
  };

  /* ============================================================
     RETURN
     ============================================================ */
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

/* ============================================================
   🧩 HOOK
   ============================================================ */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
