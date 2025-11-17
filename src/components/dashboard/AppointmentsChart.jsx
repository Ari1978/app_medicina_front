
import { AreaChart } from "@mantine/charts";

const data = [
  { day: "Lun", turnos: 4 },
  { day: "Mar", turnos: 7 },
  { day: "Mié", turnos: 5 },
  { day: "Jue", turnos: 9 },
  { day: "Vie", turnos: 6 },
];

export default function AppointmentsChart() {
  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Turnos de la semana</h3>

      <AreaChart
        h={260}
        data={data}
        dataKey="day"
        series={[{ name: "turnos", color: "indigo" }]}
        curveType="basis"
      />
    </div>
  );
}
