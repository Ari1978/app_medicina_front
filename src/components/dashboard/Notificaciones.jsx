
import { Card, Text } from "@mantine/core";

export default function Notifications() {
  const items = [
    "Nuevo examen cargado en sistema",
    "Turno confirmado por el paciente",
    "Solicitud de empresa pendiente de revisión",
  ];

  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} mb="md">Notificaciones</Text>

      <ul className="list-disc ml-5 text-gray-700 space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

