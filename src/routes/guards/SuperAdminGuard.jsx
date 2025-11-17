
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/superadmin/login" replace />;

  if (user.role !== "superadmin") {
    return <Navigate to="/superadmin/login" replace />;
  }

  return children;
}