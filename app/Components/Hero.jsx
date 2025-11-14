'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
      {/* Imagen de fondo con overlay y degradado */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://www.quironprevencion.com/blogs/es/prevenidos/entendiendo-mejor-medicina-trabajo.ficheros/44045-medicinatrabajo848.jpg?width=1600&height=900"
          alt="Fondo salud laboral"
          className="w-full h-full object-cover brightness-[0.5] scale-105 transition-transform duration-[4000ms] ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0f172a]/90"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fadeInUp">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl">
          Salud laboral al servicio de tu empresa
        </h1>

        <p className="text-lg md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
          Más de 35 años brindando soluciones médicas integrales para cuidar a tu equipo y cumplir con las normas de seguridad laboral.
        </p>

        <Link
          href="/nosotros"
          className="inline-block bg-blue-600 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          aria-label="Conocer más sobre Asmel"
        >
          Conocé más
        </Link>
      </div>

      {/* Animación personalizada */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}
