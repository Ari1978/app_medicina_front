
import { Card, Text, Progress } from "@mantine/core";

const indicadores = [
  { label: "Cumplimiento de exámenes", value: 80, color: "indigo" },
  { label: "Asistencia a turnos", value: 92, color: "green" },
  { label: "Documentación presentada", value: 65, color: "orange" },
];

export default function IndicadoresCumplimiento() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">Indicadores de cumplimiento</Text>

      <div className="space-y-4">
        {indicadores.map((i, idx) => (
          <div key={idx}>
            <Text fw={600}>{i.label}</Text>
            <Progress color={i.color} value={i.value} size="lg" />
          </div>
        ))}
      </div>
    </Card>
  );
}
