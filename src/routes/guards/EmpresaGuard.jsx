import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EmpresaGuard({ children }) {
  const { user, loading } = useAuth();

  // 🔄 Mientras carga el estado global
  if (loading) return <p>Cargando...</p>;

  // ❌ No logueado → afuera
  if (!user) return <Navigate to="/login" replace />;

  // ❌ Logueado pero NO es empresa
  if (user.role !== "user") return <Navigate to="/login" replace />;

  // ✔️ OK
  return children;
}
