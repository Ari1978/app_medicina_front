
import { Card, Text, Badge } from "@mantine/core";

const examenes = [
  { nombre: "Pedro Díaz", estado: "En proceso" },
  { nombre: "Soledad Molina", estado: "Esperando resultado" },
];

export default function ExamenesEnProceso() {
  return (
    <Card padding="lg" radius="md" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Exámenes en proceso
      </Text>

      <div className="space-y-4">
        {examenes.map((e, i) => (
          <div key={i} className="flex justify-between">
            <Text>{e.nombre}</Text>
            <Badge color={e.estado === "En proceso" ? "blue" : "yellow"}>
              {e.estado}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
