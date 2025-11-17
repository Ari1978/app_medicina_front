
import { Card, Text, Image, Group } from "@mantine/core";

export default function DashboardHeader() {
  return (
    <Card padding="lg" radius="md" className="shadow bg-white mb-8">
      <Group justify="space-between" align="center">

        <Group align="center">
          <Image
            src="https://www.asmel.com/wp-content/themes/bst-master/img/logo_header2.png"
            h={60}
            fit="contain"      // ⭐ NO SE DISTORSIONA
            alt="ASMEL Logo"
          />

          <div>
            <Text size="xl" fw={700}>
              Panel de Empresa
            </Text>
            <Text c="dimmed">
              Bienvenido al sistema de Medicina Laboral ASMEL
            </Text>
          </div>
        </Group>

      </Group>
    </Card>
  );
}
