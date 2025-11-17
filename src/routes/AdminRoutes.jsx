
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Dashboard principal */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Si querés agregar módulos del admin, van acá */}
      {/* <Route path="usuarios" element={<AdminUsuarios />} /> */}
      {/* <Route path="config" element={<AdminConfig />} /> */}

    </Routes>
  );
}
