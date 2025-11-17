
import { Card, Text } from "@mantine/core";

const notifs = [
  "Se cargó un nuevo informe de laboratorio",
  "Un paciente canceló su turno",
  "Nuevo comunicado del director médico",
];

export default function NotificacionesStaff() {
  return (
    <Card padding="lg" radius="md" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Notificaciones internas
      </Text>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        {notifs.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </Card>
  );
}
