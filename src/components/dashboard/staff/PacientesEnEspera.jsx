
import { Card, Text, Badge } from "@mantine/core";

const espera = [
  { nombre: "Brenda López", espera: "5 min" },
  { nombre: "Mario Silva", espera: "12 min" },
];

export default function PacientesEnEspera() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text size="lg" fw={700} mb="md">
        Pacientes en espera
      </Text>

      <div className="space-y-4">
        {espera.map((p, i) => (
          <div key={i} className="flex justify-between items-center">
            <Text>{p.nombre}</Text>
            <Badge color="yellow">{p.espera}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
