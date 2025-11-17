import { Routes, Route } from "react-router-dom";

// ✔ Importaciones correctas según tu estructura real
import SuperAdminDashboard from "../pages/dashboard/superadmin/SuperAdminDashboard.jsx";
import CrearEmpresa from "../pages/dashboard/superadmin/CrearEmpresa.jsx";
import CrearAdmin from "../pages/dashboard/superadmin/CrearAdmin.jsx";
import CrearStaff from "../pages/dashboard/superadmin/CrearStaff.jsx";
import Usuarios from "../pages/dashboard/superadmin/Usuarios.jsx";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard />} />
      <Route path="empresa-nueva" element={<CrearEmpresa />} />
      <Route path="admin-nuevo" element={<CrearAdmin />} />
      <Route path="staff-nuevo" element={<CrearStaff />} />
      <Route path="usuarios" element={<Usuarios />} />
    </Routes>
  );
}
