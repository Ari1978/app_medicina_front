
import { Card, Text, Badge } from "@mantine/core";

export default function Servicios() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Nuestros Servicios
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            titulo: "Turnos Médicos",
            desc: "Gestión rápida y eficiente de turnos laborales.",
            color: "indigo",
          },
          {
            titulo: "Exámenes Preocupacionales",
            desc: "Evaluaciones médicas para incorporación de personal.",
            color: "green",
          },
          {
            titulo: "Exámenes Periódicos",
            desc: "Programas de control médico anual para empresas.",
            color: "blue",
          },
        ].map((item, idx) => (
          <Card key={idx} shadow="md" padding="lg" radius="md" withBorder>
            <Badge color={item.color} size="lg" radius="sm">
              {item.titulo}
            </Badge>

            <Text mt="md" size="md">
              {item.desc}
            </Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
