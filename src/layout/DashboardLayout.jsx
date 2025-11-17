import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Inicio", path: "/dashboard/empresa", icon: "🏠" },
    { label: "Control de Ausentismo", path: "/dashboard/empresa/ausentismo", icon: "📄" },
    { label: "Turnos Especiales", path: "/dashboard/empresa/turnos-especiales", icon: "🩺" },
    { label: "Visitas Domiciliarias", path: "/dashboard/empresa/visitas-domiciliarias", icon: "🚑" },
    { label: "Exámenes Médicos", path: "/dashboard/empresa/examenes", icon: "⚕️" },
    { label: "Documentación", path: "/dashboard/empresa/documentacion", icon: "📁" },
    { label: "Facturación", path: "/dashboard/empresa/facturacion", icon: "💰" },
    { label: "Marketing", path: "/dashboard/empresa/marketing", icon: "📢" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-white shadow-lg fixed inset-y-0 z-20">
        <div className="p-6 border-b text-2xl font-bold text-blue-600">
          ASMEL Empresa
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 transition
                ${location.pathname === item.path ? "bg-blue-200 font-semibold text-blue-700" : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-2 rounded-xl"
        >
          <IconMenu2 size={20} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-700">ASMEL Menu</h2>
              <button onClick={() => setOpen(false)}>
                <IconX size={24} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 transition
                    ${location.pathname === item.path ? "bg-blue-200 font-semibold text-blue-700" : ""}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* CONTENT */}
      <main className="flex-1 ml-0 lg:ml-64 p-8">{children}</main>
    </div>
  );
}
