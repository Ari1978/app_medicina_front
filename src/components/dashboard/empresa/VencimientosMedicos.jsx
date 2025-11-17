
import { Card, Text, Progress } from "@mantine/core";

const datos = [
  { nombre: "Juan Pérez", dias: 12 },
  { nombre: "María Gómez", dias: 5 },
  { nombre: "Luis Fernández", dias: 1 },
];

export default function VencimientosMedicos() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} mb="md" size="lg">
        Vencimientos médicos próximos
      </Text>

      <div className="flex flex-col gap-4">
        {datos.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <Text fw={600}>{item.nombre}</Text>
              <Text size="sm" c="dimmed">{item.dias} días</Text>
            </div>

            <Progress
              value={Math.max(0, Math.min(100, 100 - item.dias * 5))}
              color={item.dias <= 3 ? "red" : item.dias <= 10 ? "yellow" : "green"}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
