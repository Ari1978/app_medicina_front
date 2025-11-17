
import { Card, Text } from "@mantine/core";

const alertas = [
  "Hay 3 exámenes que requieren seguimiento.",
  "Un paciente no se presentó al turno de hoy.",
  "Documento vencido en legajo de empleado."
];

export default function AlertasImportantes() {
  return (
    <Card radius="md" padding="lg" className="shadow">
      <Text fw={700} size="lg" mb="md">
        Alertas Importantes
      </Text>

      <ul className="list-disc ml-5 space-y-2 text-gray-700">
        {alertas.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </Card>
  );
}
