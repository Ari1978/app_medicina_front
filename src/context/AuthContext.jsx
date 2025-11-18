import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ================================
  // 🔗 BACKEND URL normalizada
  // ================================
  const API = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000")
    .replace(/\/$/, ""); // saca el slash final si lo tuviera

  // Helper: asegura que siempre quede bien la URL final
  const buildUrl = (path) => {
    if (path.startsWith("/")) return `${API}${path}`;
    return `${API}/${path}`;
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // Verificar sesión existente
  // ================================
  const checkSession = async () => {
    setLoading(true);

    try {
      // Empresa
      let res = await fetch(buildUrl("/api/user/me"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      // Admin/Superadmin
      res = await fetch(buildUrl("/api/admin/me"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      // Staff
      res = await fetch(buildUrl("/api/staff/me"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      setUser(null);
    } catch (err) {
      console.error("❌ Error en checkSession:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ================================
  // LOGIN
  // ================================
  const login = async (type, identifier, password) => {
    let endpoint = "";

    switch (type) {
      case "user":
        endpoint = "user";
        break;
      case "staff":
        endpoint = "staff";
        break;
      case "admin":
      case "superadmin":
        endpoint = "admin";
        break;
      default:
        throw new Error("Tipo de login inválido");
    }

    const payload =
      type === "user"
        ? { cuit: identifier, password }
        : { username: identifier, password };

    const res = await fetch(buildUrl(`/api/${endpoint}/login`), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Error inesperado del servidor");
    }

    if (!res.ok) throw new Error(data.message);

    setUser(data.user);

    switch (data.user.role) {
      case "user":
        return "/dashboard/empresa";
      case "staff":
        return "/dashboard/staff";
      case "admin":
        return "/dashboard/admin";
      case "superadmin":
        return "/dashboard/superadmin";
      default:
        return "/";
    }
  };

  // ================================
  // LOGOUT
  // ================================
  const logout = async () => {
    if (!user) {
      setUser(null);
      return;
    }

    let endpoint = "user";
    if (user.role === "admin" || user.role === "superadmin") endpoint = "admin";
    if (user.role === "staff") endpoint = "staff";

    try {
      await fetch(buildUrl(`/api/${endpoint}/logout`), {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("⚠️ Error al cerrar sesión (cliente continúa limpiando estado)");
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
