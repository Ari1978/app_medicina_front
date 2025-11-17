
import { Card, Text, Group, Avatar } from "@mantine/core";

export default function StaffHeader() {
  return (
    <Card padding="lg" radius="md" className="shadow bg-white mb-8">
      <Group>
        <Avatar size={70} radius="xl" color="indigo">
          ST
        </Avatar>

        <div>
          <Text size="xl" fw={700}>
            Panel del Staff
          </Text>
          <Text c="dimmed">
            Gestión diaria de turnos, pacientes y exámenes
          </Text>
        </div>
      </Group>
    </Card>
  );
}
