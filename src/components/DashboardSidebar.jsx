
import { IconHome, IconCalendar, IconUsers, IconSettings } from "@tabler/icons-react";

export default function DashboardSidebar({ role }) {
  const baseLinks = [
    { label: "Inicio", icon: <IconHome />, to: "/" },
    { label: "Turnos", icon: <IconCalendar />, to: "/turnos" },
  ];

  const roleLinks = {
    user: [],
    staff: [{ label: "Pacientes", icon: <IconUsers />, to: "/pacientes" }],
    admin: [{ label: "Usuarios", icon: <IconUsers />, to: "/usuarios" }],
    superadmin: [
      { label: "Administradores", icon: <IconUsers />, to: "/admins" },
      { label: "Configuración", icon: <IconSettings />, to: "/config" },
    ],
  };

  const links = [...baseLinks, ...(roleLinks[role] || [])];

  return (
    <aside className="w-64 h-full bg-white shadow-lg p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-indigo-600">Panel {role}</h2>

      {links.map((item, idx) => (
        <a
          key={idx}
          href={item.to}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition font-medium text-gray-700"
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </aside>
  );
}
