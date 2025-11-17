export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">

      {/* Imagen que NO se distorsiona */}
      <img
        src="https://miempresaessaludable.com/wp-content/uploads/2025/07/ia-voz-salud.jpg"
        alt="Medicina laboral"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          Medicina Laboral para Empresas
        </h1>

        <p className="text-xl mt-4 max-w-2xl mx-auto drop-shadow-md">
          Turnos, exámenes preocupacionales y asesoramiento integral para tu empresa.
        </p>

        <button className="mt-6 bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-200 transition">
          Solicitar Turno
        </button>
      </div>

    </section>
  );
}
