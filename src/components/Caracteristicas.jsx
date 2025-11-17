
import { IconCalendar, IconHeartbeat, IconBuildingHospital } from "@tabler/icons-react";

export default function Caracteristicas() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        ¿Por qué elegir ASMEL?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            icon: <IconCalendar size={48} className="text-indigo-600" />,
            title: "Gestión de Turnos",
            desc: "Sistema optimizado y rápido para coordinar evaluaciones médicas.",
          },
          {
            icon: <IconHeartbeat size={48} className="text-green-600" />,
            title: "Profesionales Certificados",
            desc: "Equipo médico altamente capacitado y especializado.",
          },
          {
            icon: <IconBuildingHospital size={48} className="text-blue-600" />,
            title: "Atención Integral",
            desc: "Soluciones completas en medicina laboral para tu empresa.",
          },
        ].map((c, idx) => (
          <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-center mb-4">{c.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{c.title}</h3>
            <p className="text-gray-600">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
