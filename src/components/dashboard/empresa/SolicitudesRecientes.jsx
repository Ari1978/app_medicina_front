
import { Card, Text, Badge } from "@mantine/core";

const solicitudes = [
  { tipo: "Turno", detalle: "Juan Pérez", estado: "Confirmado" },
  { tipo: "Examen", detalle: "Ana Gómez - Preocupacional", estado: "Pendiente" },
  { tipo: "Marketing", detalle: "Solicitud de folletería", estado: "En revisión" },
];

export default function SolicitudesRecientes() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Solicitudes recientes
      </Text>

      <div className="space-y-4">
        {solicitudes.map((s, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <Text fw={600}>{s.tipo}</Text>
              <Text size="sm" c="dimmed">{s.detalle}</Text>
            </div>

            <Badge
              color={
                s.estado === "Confirmado"
                  ? "green"
                  : s.estado === "Pendiente"
                  ? "yellow"
                  : "blue"
              }
            >
              {s.estado}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
