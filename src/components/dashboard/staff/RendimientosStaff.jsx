
import { Card, Text, Progress } from "@mantine/core";

const metrics = [
  { label: "Pacientes atendidos hoy", value: 70, color: "green" },
  { label: "Informes completados", value: 45, color: "indigo" },
  { label: "Cumplimiento del tiempo objetivo", value: 82, color: "blue" },
];

export default function RendimientoStaff() {
  return (
    <Card padding="lg" radius="md" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Rendimiento del staff
      </Text>

      <div className="space-y-4">
        {metrics.map((m, i) => (
          <div key={i}>
            <Text fw={600}>{m.label}</Text>
            <Progress color={m.color} value={m.value} size="lg" />
          </div>
        ))}
      </div>
    </Card>
  );
}
