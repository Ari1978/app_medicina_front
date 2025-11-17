
import { Card, Text } from "@mantine/core";

export default function InfoEmpresa() {
  return (
    <Card radius="md" padding="lg" className="shadow bg-indigo-50">
      <Text fw={700} size="lg" mb="sm">
        Tu empresa
      </Text>
      <Text>Cuit: 30-12345678-9</Text>
      <Text>Responsable: Juan Rodríguez</Text>
      <Text>Sede: Buenos Aires</Text>
    </Card>
  );
}
