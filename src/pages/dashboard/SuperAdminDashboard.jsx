// SuperAdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const [resumen, setResumen] = useState({
    empresas: 0,
    staff: 0,
    admins: 0,
  });

  useEffect(() => {
    if (!user) return;
    if (user.role !== "superadmin") navigate("/superadmin/login");
  }, [user]);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const r = await fetch(`${API}/api/admin/listar-usuarios`, {
          credentials: "include",
        });

        if (!r.ok) return;
        const usuarios = await r.json();

        setResumen({
          empresas: usuarios.filter((u) => u.role === "user").length,
          staff: usuarios.filter((u) => u.role === "staff").length,
          admins: usuarios.filter((u) => u.role === "admin").length,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchResumen();
  }, []);

  if (!user) return <div className="p-6 text-white">Cargando…</div>;

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* HEADER FIJO */}
      <header className="p-4 sm:p-6 flex justify-between items-center shadow-md bg-slate-900 sticky top-0 z-50 h-[80px]">
        <h1 className="text-2xl sm:text-3xl font-bold">Panel SuperAdmin</h1>

        <button
          onClick={logout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm sm:text-base shadow-md"
        >
          Cerrar sesión
        </button>
      </header>

      {/* CONTENIDO SCROLLEABLE (ALTURA EXACTA) */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] p-6 sm:p-10 md:p-10 pb-24">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <KpiBox title="Empresas" value={resumen.empresas} />
          <KpiBox title="Staff" value={resumen.staff} />
          <KpiBox title="Admins" value={resumen.admins} />
        </div>

        {/* MÓDULOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pb-10">
          <Card
            title="Crear Empresa"
            onClick={() => navigate("/dashboard/superadmin/empresa-nueva")}
          />
          <Card
            title="Perfiles de examen"
            onClick={() => navigate("/dashboard/superadmin/perfiles-empresa")}
          />

          <Card
            title="Crear Admin"
            onClick={() => navigate("/dashboard/superadmin/admin-nuevo")}
          />
          <Card
            title="Crear Staff"
            onClick={() => navigate("/dashboard/superadmin/staff-nuevo")}
          />
          <Card
            title="Ver usuarios"
            onClick={() => navigate("/dashboard/superadmin/usuarios")}
          />
        </div>
      </div>
    </div>
  );
}

function KpiBox({ title, value }) {
  return (
    <div className="bg-slate-800 p-5 sm:p-6 rounded-xl shadow-lg text-center sm:text-left">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-3xl sm:text-4xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-slate-800 hover:bg-slate-700 p-5 sm:p-6 rounded-xl transition shadow-xl flex flex-col justify-between"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>

      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm sm:text-base w-full sm:w-auto">
        Entrar
      </button>
    </div>
  );
}
