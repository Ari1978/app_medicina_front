
import { Card, Text, Badge } from "@mantine/core";

const agenda = [
  { hora: "08:00", nombre: "Juan Pérez", tipo: "Preocupacional" },
  { hora: "09:40", nombre: "Lucía Torres", tipo: "Laboratorio" },
  { hora: "11:00", nombre: "Carlos Meza", tipo: "Control periódico" },
];

export default function StaffAgendaHoy() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text size="lg" fw={700} mb="md">
        Agenda de hoy
      </Text>

      <div className="space-y-4">
        {agenda.map((a, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div>
              <Text fw={600}>{a.nombre}</Text>
              <Text c="dimmed" size="sm">{a.tipo}</Text>
            </div>
            <Badge color="indigo">{a.hora}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
