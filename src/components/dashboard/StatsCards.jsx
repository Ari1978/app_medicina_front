
import { Card, Text, Group, Badge } from "@mantine/core";
import { IconCalendar, IconUser, IconReportAnalytics, IconBuildingHospital } from "@tabler/icons-react";

const statsData = [
  {
    label: "Turnos del mes",
    value: "128",
    icon: <IconCalendar size={40} className="text-indigo-600" />,
    color: "indigo",
  },
  {
    label: "Pacientes atendidos",
    value: "96",
    icon: <IconUser size={40} className="text-green-600" />,
    color: "green",
  },
  {
    label: "Exámenes pendientes",
    value: "14",
    icon: <IconReportAnalytics size={40} className="text-yellow-600" />,
    color: "yellow",
  },
  {
    label: "Clínicas asociadas",
    value: "5",
    icon: <IconBuildingHospital size={40} className="text-blue-600" />,
    color: "blue",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsData.map((stat, idx) => (
        <Card key={idx} radius="md" padding="lg" className="shadow hover:shadow-lg transition">
          <Group>
            {stat.icon}
            <div>
              <Text size="sm" c="dimmed">{stat.label}</Text>
              <Text size="xl" fw={700}>{stat.value}</Text>
            </div>
          </Group>
        </Card>
      ))}
    </div>
  );
}
