
import { Routes, Route } from "react-router-dom";
import StaffDashboard from "../pages/dashboard/StaffDashboard";

export default function StaffRoutes() {
  return (
    <Routes>

      {/* Dashboard principal */}
      <Route path="/" element={<StaffDashboard />} />

      {/* Rutas adicionales para staff SI MÁS ADELANTE las agregás */}
      {/* <Route path="pacientes" element={<PacientesPage />} /> */}
      {/* <Route path="notificaciones" element={<NotificacionesPage />} /> */}

    </Routes>
  );
}
