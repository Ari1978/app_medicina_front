// src/main.jsx
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

// Registro
import RegisterEmpresa from "./pages/register/RegisterEmpresa.jsx";
import ValidarCuit from "./pages/register/ValidarCuit.jsx";

// Dashboards (rutas agrupadas)
import EmpresaRoutes from "./routes/EmpresaRoutes.jsx";
import StaffRoutes from "./routes/StaffRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import SuperAdminRoutes from "./routes/SuperAdminRoutes.jsx";

// Guards
import EmpresaGuard from "./guards/EmpresaGuard.jsx";
import StaffGuard from "./guards/StaffGuard.jsx";
import AdminGuard from "./guards/AdminGuard.jsx";
import SuperAdminGuard from "./guards/SuperAdminGuard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<App />} />

            {/* Logins */}
            <Route path="/login" element={<LoginEmpresa />} />
            <Route path="/login-staff" element={<LoginStaff />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/superadmin/login" element={<LoginSuperAdmin />} />

            {/* Registro */}
            <Route path="/register" element={<RegisterEmpresa />} />
            <Route path="/validar-cuit" element={<ValidarCuit />} />

            {/* Dashboards protegidos */}
            <Route
              path="/dashboard/empresa/*"
              element={
                <EmpresaGuard>
                  <EmpresaRoutes />
                </EmpresaGuard>
              }
            />
            <Route
              path="/dashboard/staff/*"
              element={
                <StaffGuard>
                  <StaffRoutes />
                </StaffGuard>
              }
            />
            <Route
              path="/dashboard/admin/*"
              element={
                <AdminGuard>
                  <AdminRoutes />
                </AdminGuard>
              }
            />
            <Route
              path="/dashboard/superadmin/*"
              element={
                <SuperAdminGuard>
                  <SuperAdminRoutes />
                </SuperAdminGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
