import DashboardLayout from "../../layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="superadmin">
      
      {/* HEADER */}
      <h2 className="text-2xl font-semibold">
        Bienvenido {user?.nombre || "SuperAdmin"}
      </h2>
      <p className="mt-2 text-gray-700">
        Control total del sistema, empresas, administradores y staff.
      </p>

      {/* ACCIONES RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <ActionCard
          title="Empresas"
          desc="Crear y gestionar empresas"
          to="/dashboard/superadmin/empresa-nueva"
        />

        <ActionCard
          title="Administradores"
          desc="Crear administradores del sistema"
          to="/dashboard/superadmin/admin-nuevo"
        />

        <ActionCard
          title="Staff"
          desc="Gestionar personal interno"
          to="/dashboard/superadmin/staff-nuevo"
        />

        <ActionCard
          title="Usuarios"
          desc="Ver todos los usuarios del sistema"
          to="/dashboard/superadmin/usuarios"
        />

      </div>
    </DashboardLayout>
  );
}

function ActionCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="block bg-slate-900 border border-slate-800 p-4 rounded-xl 
                 hover:bg-slate-800 hover:border-cyan-500/60 transition"
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-3">{desc}</p>
      <span className="text-xs text-cyan-400">Ir al módulo →</span>
    </Link>
  );
}
