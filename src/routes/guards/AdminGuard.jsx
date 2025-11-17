import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Mientras carga
  if (loading) return <p>Cargando...</p>;

  // ❌ No logueado
  if (!user) return <Navigate to="/login-admin" replace />;

  // ❌ Logueado pero NO es admin
  if (user.role !== "admin") return <Navigate to="/login-admin" replace />;

  // ✔️ OK
  return children;
}
