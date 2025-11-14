"use client";
import Nosotros from "../Components/Nosotros";
import BotonVolverWrapper from "../Components/BotonVolver";


export default function NosotrosPage() {
  return (
    <main className="about-container">
      <Nosotros />

      <div className="flex justify-start mt-6">
              <BotonVolverWrapper />
            </div>
    </main>
  );
}
