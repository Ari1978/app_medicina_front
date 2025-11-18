import DashboardLayout from "../../layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EmpresaDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login"; // 🔥 Redirección inmediata
  };

  return (
    <DashboardLayout role="user">

      {/* 🔥 CONTENEDOR QUE EVITA QUE EL BOTÓN DE MENÚ TAPE EL HEADER */}
      <div className="mt-12 sm:mt-0">

        {/* HEADER DEL DASHBOARD */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600">
              Bienvenido {user?.empresa || "Empresa"}
            </h2>
            <p className="text-sm text-slate-800">
              Panel de gestión empresarial
            </p>
          </div>

          {/* BOTÓN DE LOGOUT */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* INFORMACIÓN DEL PANEL */}
        <p className="text-sm text-slate-600 mb-6">
          Desde aquí podés gestionar ausentismo, exámenes, visitas domiciliarias,
          facturación y servicios de marketing.
        </p>

        {/* INDICADORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <CardKpi title="Turnos próximos" value="12" note="Próximas 48 hs" />
          <CardKpi title="Exámenes vigentes" value="83%" note="Dotación activa" />
          <CardKpi title="Casos de ausentismo" value="4" note="En seguimiento" />
          <CardKpi title="Facturas pendientes" value="2" note="Últimos 30 días" />
        </div>

        {/* ACCIONES RÁPIDAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-24">
          <QuickAction
            title="Control de ausentismo"
            description="Registrar un nuevo caso."
            to="/dashboard/empresa/ausentismo"
          />
          <QuickAction
            title="Solicitar examen médico"
            description="Ingresos, periódicos, egresos."
            to="/dashboard/empresa/examenes"
          />
          <QuickAction
            title="Médico a domicilio"
            description="Visitas domiciliarias."
            to="/dashboard/empresa/visitas-domiciliarias"
          />
          <QuickAction
            title="Turnos especiales"
            description="Especialidades médicas."
            to="/dashboard/empresa/turnos-especiales"
          />
          <QuickAction
            title="Descargar exámenes"
            description="PDF de exámenes realizados."
            to="/dashboard/empresa/documentacion"
          />
          <QuickAction
            title="Facturación"
            description="Tu facturación mensual."
            to="/dashboard/empresa/facturacion"
          />
        </div>

      </div> 
      {/* 🔥 CIERRE DEL FIX */}

    </DashboardLayout>
  );
}

function CardKpi({ title, value, note }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
      <p className="text-xs text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{note}</p>
    </div>
  );
}

function QuickAction({ title, description, to }) {
  return (
    <Link
      to={to}
      className="block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/60 hover:bg-slate-900/80 transition"
    >
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-slate-400 mb-3">{description}</p>
      <span className="text-xs text-cyan-400">Ir al módulo →</span>
    </Link>
  );
}
