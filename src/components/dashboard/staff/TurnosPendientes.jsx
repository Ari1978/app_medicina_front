
import { Card, Text, Badge } from "@mantine/core";

const pendientes = [
  { nombre: "Laura Bustos", tipo: "Preocupacional" },
  { nombre: "Sergio Rey", tipo: "Radiografía" },
];

export default function TurnosPendientes() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Turnos pendientes
      </Text>

      <div className="space-y-4">
        {pendientes.map((p, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <Text fw={600}>{p.nombre}</Text>
              <Text size="sm" c="dimmed">{p.tipo}</Text>
            </div>
            <Badge color="orange">Pendiente</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
