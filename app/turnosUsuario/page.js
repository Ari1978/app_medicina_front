import TurnosPorUsuario from "../Components/TurnosPorUsuario";

export default function TurnosUsuarioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-5 py-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Mis Turnos Confirmados
      </h1>

      <TurnosPorUsuario />
    </div>
  );
}

