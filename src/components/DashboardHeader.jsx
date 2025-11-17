
import { Button } from "@mantine/core";

export default function DashboardHeader({ role }) {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard {role.toUpperCase()}
      </h1>

      <Button color="red" variant="light">
        Cerrar sesión
      </Button>
    </header>
  );
}
