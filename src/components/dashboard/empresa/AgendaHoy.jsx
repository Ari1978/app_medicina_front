
import { Card, Text, Badge } from "@mantine/core";

const agenda = [
  { hora: "08:00", persona: "Carlos Díaz", tipo: "Examen preocupacional" },
  { hora: "10:30", persona: "Ana Rivas", tipo: "Control periódico" },
  { hora: "13:00", persona: "Luciano Torres", tipo: "Laboratorio" },
];

export default function AgendaHoy() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Agenda de hoy
      </Text>

      <div className="space-y-4">
        {agenda.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div>
              <Text fw={600}>{item.persona}</Text>
              <Text size="sm" c="dimmed">{item.tipo}</Text>
            </div>
            <Badge color="indigo">{item.hora}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
