import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@mantine/core/styles.css";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext.jsx";

// Landing
import App from "./App.jsx";

// Logins
import LoginEmpresa from "./pages/login/LoginEmpresa.jsx";
import LoginStaff from "./pages/login/LoginStaff.jsx";
import LoginAdmin from "./pages/login/LoginAdmin.jsx";
import LoginSuperAdmin from "./pages/login/LoginSuperAdmin.jsx";

// Dashboards
import EmpresaDashboard from "./pages/dashboard/EmpresaDashboard.jsx";
import StaffDashboard from "./pages/dashboard/StaffDashboard.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard.jsx";

// Guards
import EmpresaGuard from "./routes/guards/EmpresaGuard.jsx";
import StaffGuard from "./routes/guards/StaffGuard.jsx";
import AdminGuard from "./routes/guards/AdminGuard.jsx";
import SuperAdminGuard from "./routes/guards/SuperAdminGuard.jsx";

//
import CrearAdmin from "./pages/dashboard/superadmin/CrearAdmin.jsx";
import CrearEmpresa from "./pages/dashboard/superadmin/CrearEmpresa.jsx";
import CrearStaff from "./pages/dashboard/superadmin/CrearStaff.jsx";
import Usuarios from "./pages/dashboard/superadmin/Usuarios.jsx";

// Subpáginas Empresa
import ControlAusentismo from "./pages/dashboard/empresa/ControlAusentismo.jsx";
import TurnosEspeciales from "./pages/dashboard/empresa/TurnoEspeciales.jsx";
import VisitasDomiciliarias from "./pages/dashboard/empresa/VisitasDomiciliarias.jsx";
import ExamenesMedicos from "./pages/dashboard/empresa/ExamenesMedicos.jsx";
import MarketingEmpresa from "./pages/dashboard/empresa/MerketingEmpresa.jsx";
import DocumentacionExamenes from "./pages/dashboard/empresa/DocumentacioExamenes.jsx";
import FacturacionEmpresa from "./pages/dashboard/empresa/FacturacionEmpresa.jsx";
import RegisterEmpresa from "./pages/register/RegisterEmpresa.jsx";
import PerfilesEmpresa from "./pages/dashboard/superadmin/PerfilesEmpresa.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<App />} />

            {/* Logins */}
            <Route path="/login" element={<LoginEmpresa />} />
            <Route path="/staff/login" element={<LoginStaff />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/superadmin/login" element={<LoginSuperAdmin />} />

            <Route path="/register" element={<RegisterEmpresa />} />


            {/* DASHBOARD EMPRESA */}
            <Route
              path="/dashboard/empresa"
              element={
                <EmpresaGuard>
                  <EmpresaDashboard />
                </EmpresaGuard>
              }
            />

            {/* SUBPÁGINAS EMPRESA */}
            <Route
              path="/dashboard/empresa/ausentismo"
              element={
                <EmpresaGuard>
                  <ControlAusentismo />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/turnos-especiales"
              element={
                <EmpresaGuard>
                  <TurnosEspeciales />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/visitas-domiciliarias"
              element={
                <EmpresaGuard>
                  <VisitasDomiciliarias />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/examenes"
              element={
                <EmpresaGuard>
                  <ExamenesMedicos />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/marketing"
              element={
                <EmpresaGuard>
                  <MarketingEmpresa />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/documentacion"
              element={
                <EmpresaGuard>
                  <DocumentacionExamenes />
                </EmpresaGuard>
              }
            />

            <Route
              path="/dashboard/empresa/facturacion"
              element={
                <EmpresaGuard>
                  <FacturacionEmpresa />
                </EmpresaGuard>
              }
            />

            {/* DASHBOARD SUPERADMIN */}
            <Route
              path="/dashboard/superadmin"
              element={
                <SuperAdminGuard>
                  <SuperAdminDashboard />
                </SuperAdminGuard>
              }
            />

            {/* SUBPÁGINAS SUPERADMIN */}
            <Route
              path="/dashboard/superadmin/empresa-nueva"
              element={
                <SuperAdminGuard>
                  <CrearEmpresa />
                </SuperAdminGuard>
              }
            />

            <Route
              path="/dashboard/superadmin/admin-nuevo"
              element={
                <SuperAdminGuard>
                  <CrearAdmin />
                </SuperAdminGuard>
              }
            />

            <Route
              path="/dashboard/superadmin/staff-nuevo"
              element={
                <SuperAdminGuard>
                  <CrearStaff />
                </SuperAdminGuard>
              }
            />

            <Route
              path="/dashboard/superadmin/usuarios"
              element={
                <SuperAdminGuard>
                  <Usuarios />
                </SuperAdminGuard>
              }
            />

            <Route
              path="/dashboard/superadmin/perfiles-empresa"
              element={
                <SuperAdminGuard>
                  <PerfilesEmpresa />
                </SuperAdminGuard>
              }
            />
            

            {/* DASHBOARD STAFF */}
            <Route
              path="/dashboard/staff"
              element={
                <StaffGuard>
                  <StaffDashboard />
                </StaffGuard>
              }
            />

            {/* DASHBOARD ADMIN */}
            <Route
              path="/dashboard/admin"
              element={
                <AdminGuard>
                  <AdminDashboard />
                </AdminGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
