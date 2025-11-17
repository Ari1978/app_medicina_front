
import { Card, Text, Badge } from "@mantine/core";

export default function NextAppointments() {
  const data = [
    { fecha: "2025-11-20", nombre: "Juan Pérez", estado: "Confirmado" },
    { fecha: "2025-11-22", nombre: "María Gómez", estado: "Pendiente" },
    { fecha: "2025-11-23", nombre: "Luis Martínez", estado: "Pendiente" },
  ];

  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text size="lg" fw={700} mb="md">Próximos turnos</Text>

      <div className="flex flex-col gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div>
              <Text fw={600}>{item.nombre}</Text>
              <Text size="sm" c="dimmed">{item.fecha}</Text>
            </div>
            <Badge color={item.estado === "Confirmado" ? "green" : "yellow"}>
              {item.estado}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
