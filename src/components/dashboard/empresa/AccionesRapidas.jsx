
import { Card, Text, Group } from "@mantine/core";
import { IconCalendarPlus, IconUserPlus, IconFileText, IconBuildingHospital } from "@tabler/icons-react";

const acciones = [
  { label: "Nuevo Turno", icon: IconCalendarPlus, color: "indigo" },
  { label: "Agregar Empleado", icon: IconUserPlus, color: "green" },
  { label: "Documentación", icon: IconFileText, color: "orange" },
  { label: "Clínicas", icon: IconBuildingHospital, color: "blue" },
];

export default function AccionesRapidas() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Acciones rápidas
      </Text>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {acciones.map((a, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            <a.icon size={32} className={`text-${a.color}-600`} />
            <Text size="sm" fw={600}>{a.label}</Text>
          </button>
        ))}
      </div>
    </Card>
  );
}
