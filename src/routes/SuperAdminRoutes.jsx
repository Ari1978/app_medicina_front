// src/routes/SuperAdminRoutes.jsx
import { Routes, Route } from "react-router-dom";

import SuperAdminDashboard from "../pages/dashboard/superadmin/SuperAdminDashboard.jsx";
import CrearEmpresa from "../pages/dashboard/superadmin/CrearEmpresa.jsx";
import CrearAdmin from "../pages/dashboard/superadmin/CrearAdmin.jsx";
import CrearStaff from "../pages/dashboard/superadmin/CrearStaff.jsx";
import Usuarios from "../pages/dashboard/superadmin/Usuarios.jsx";
import PerfilesEmpresa from "../pages/dashboard/superadmin/PerfilesEmpresa.jsx";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard />} />
      <Route path="empresa-nueva" element={<CrearEmpresa />} />
      <Route path="admin-nuevo" element={<CrearAdmin />} />
      <Route path="staff-nuevo" element={<CrearStaff />} />
      <Route path="usuarios" element={<Usuarios />} />
      <Route path="perfiles-empresa" element={<PerfilesEmpresa />} />
    </Routes>
  );
}
