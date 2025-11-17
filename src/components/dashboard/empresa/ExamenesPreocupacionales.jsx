
import { Card, Text, Badge } from "@mantine/core";

const examenes = [
  { nombre: "Martín Sosa", estado: "Pendiente" },
  { nombre: "Paula Giménez", estado: "En curso" },
  { nombre: "Roberto Silva", estado: "Finalizado" },
];

export default function ExamenesPreocupacionales() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Exámenes Preocupacionales
      </Text>

      <div className="space-y-3">
        {examenes.map((ex, i) => (
          <div key={i} className="flex justify-between items-center">
            <Text>{ex.nombre}</Text>
            <Badge
              color={
                ex.estado === "Finalizado"
                  ? "green"
                  : ex.estado === "En curso"
                  ? "yellow"
                  : "red"
              }
            >
              {ex.estado}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
