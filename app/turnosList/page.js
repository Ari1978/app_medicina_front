import TurnosList from "../Components/TurnosList";
import BotonVolverWrapper from "../Components/BotonVolver";


export default function TurnosListPage() {
  return (
    <div className="p-15 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Turnos Confirmados (General)
      </h1>
      <TurnosList />
      <br />
      <BotonVolverWrapper />
    </div>
  );
}

