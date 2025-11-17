
import { Card, Text } from "@mantine/core";
import { IconClipboardPlus, IconStethoscope, IconUserSearch } from "@tabler/icons-react";

const acciones = [
  { label: "Nuevo examen", icon: IconClipboardPlus },
  { label: "Atender paciente", icon: IconStethoscope },
  { label: "Buscar paciente", icon: IconUserSearch },
];

export default function AccionesStaff() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Acciones rápidas
      </Text>

      <div className="grid grid-cols-3 gap-4">
        {acciones.map((a, i) => (
          <div
            key={i}
            className="bg-gray-100 hover:bg-gray-200 transition p-4 rounded-lg flex flex-col items-center"
          >
            <a.icon size={32} className="text-indigo-600" />
            <Text size="sm" fw={600} mt="xs">{a.label}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
}
