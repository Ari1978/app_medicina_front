import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StaffGuard({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Mientras carga
  if (loading) return <p>Cargando...</p>;

  // ❌ No logueado
  if (!user) return <Navigate to="/login-staff" replace />;

  // ❌ Logueado pero NO es staff
  if (user.role !== "staff") return <Navigate to="/login-staff" replace />;

  // ✔️ OK
  return children;
}
