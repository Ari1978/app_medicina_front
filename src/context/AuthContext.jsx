import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // Verificar sesión existente
  // ================================
  const checkSession = async () => {
    setLoading(true);

    try {
      // 1) Empresa
      let res = await fetch(`${API}/api/user/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      // 2) Admin / SuperAdmin
      res = await fetch(`${API}/api/admin/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      // 3) Staff
      res = await fetch(`${API}/api/staff/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return;
      }

      setUser(null);
    } catch {
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
    }

    const payload =
      type === "user"
        ? { cuit: identifier, password }
        : { username: identifier, password };

    const res = await fetch(`${API}/api/${endpoint}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
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

    if (user.role === "admin" || user.role === "superadmin") {
      endpoint = "admin";
    }

    if (user.role === "staff") {
      endpoint = "staff";
    }

    await fetch(`${API}/api/${endpoint}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
