import SaludMental from "../Components/AsesorMedico";
import BotonVolverWrapper from "../Components/BotonVolver";

export default function SaludMentalPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <SaludMental />
      <div className="flex justify-start mt-4">
              <BotonVolverWrapper />
            </div>
    </div>
  );
}

