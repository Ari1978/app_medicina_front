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

  // Seguridad básica
  useEffect(() => {
    if (!user) return;
    if (user.role !== "superadmin") navigate("/superadmin/login");
  }, [user]);

  // Obtener KPIs
  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const r = await fetch(`${API}/api/admin/listar-usuarios`, {
          credentials: "include",
        });

        if (!r.ok) return;

        const usuarios = await r.json();

        setResumen({
          empresas: usuarios.filter(u => u.role === "user").length,
          staff: usuarios.filter(u => u.role === "staff").length,
          admins: usuarios.filter(u => u.role === "admin").length,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchResumen();
  }, []);

  if (!user) return <div className="p-6 text-white">Cargando…</div>;

  return (
    <div className="min-h-screen p-6 text-white bg-slate-900">
      <header className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Panel SuperAdmin</h1>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Cerrar sesión
        </button>
      </header>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <KpiBox title="Empresas" value={resumen.empresas} />
        <KpiBox title="Staff" value={resumen.staff} />
        <KpiBox title="Admins" value={resumen.admins} />
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Crear Empresa"
          onClick={() => navigate("/dashboard/superadmin/empresa-nueva")}
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
  );
}

function KpiBox({ title, value }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-slate-800 hover:bg-slate-700 p-6 rounded-xl transition shadow-xl"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
        Entrar
      </button>
    </div>
  );
}
