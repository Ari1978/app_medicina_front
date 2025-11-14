
'use client';

import Link from 'next/link';

export default function MedicinaLaboral() {
  return (
    <div className="bg-white text-gray-900">

      {/* Sección 1 - Introducción */}
      <section className="py-16 px-6 md:px-12 bg-blue-100 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">La Importancia de la Medicina Laboral en Tu Empresa</h1>
        <p className="text-lg md:text-xl mb-6">
          Cuidar la salud de tu equipo es clave para el éxito de tu negocio. Descubre cómo la medicina laboral
          puede mejorar el bienestar de tus empleados y optimizar la productividad de tu empresa.
        </p>
      </section>

      {/* Sección 2 - Beneficios */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            ¿Por Qué Elegir la Medicina Laboral para Tu Empresa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Reducción de Costos</h3>
              <p>
                Implementar programas de salud laboral reduce los costos relacionados con licencias por enfermedad, seguros médicos y otros gastos.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Cumplimiento Normativo</h3>
              <p>
                Con nuestra ayuda, cumplirás con todas las normativas legales relacionadas con la salud ocupacional y evitarás sanciones.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Mejora de la Productividad</h3>
              <p>
                Un empleado saludable es un empleado más productivo. La medicina laboral ayuda a prevenir enfermedades y accidentes.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Bienestar del Empleado</h3>
              <p>
                Cuidar de la salud de tus trabajadores incrementa su satisfacción y compromiso con la empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 - Servicios de Asmel Clinic */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Servicios de Medicina Laboral de Asmel 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Exámenes Médicos Periódicos</h3>
              <p>
                Evaluamos la salud de tus empleados antes, durante y al final de su ciclo laboral para detectar cualquier riesgo.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Asesoramiento en Salud Ocupacional</h3>
              <p>
                Ofrecemos consultoría especializada para que tu empresa cumpla con todas las normativas y brinde un ambiente saludable.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Prevención de Accidentes</h3>
              <p>
                Implementamos estrategias para minimizar los riesgos en el lugar de trabajo y garantizar la seguridad de tus empleados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4 - Testimonios */}
      <section className="py-12 px-6 md:px-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Lo Que Dicen Nuestros Clientes</h2>
          <div className="space-y-8">
            <div>
              <p className="text-lg italic mb-4">
                Contratar a Asmel fue una de las mejores decisiones para nuestra empresa. No solo aseguraron que
                cumpliéramos con todas las regulaciones, sino que también ayudaron a mejorar el ambiente de trabajo.
              </p>
              <p className="font-semibold">Carlos Rodríguez, Gerente General, XYZ Corp.</p>
            </div>
            <div>
              <p className="text-lg italic mb-4">
                Gracias a Asmel, nuestros empleados están mucho más saludables. Los exámenes periódicos y el seguimiento
                constante nos han permitido detectar problemas a tiempo, lo que ha reducido los accidentes laborales.
              </p>
              <p className="font-semibold">Ana López, Directora de Recursos Humanos, ABC Ltda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5 - Llamado a la acción */}
      <section className="py-16 px-6 md:px-12 bg-blue-100 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">¿Estás Listo para Proteger a Tu Equipo?</h2>
        <p className="text-lg mb-6">
          No pongas en riesgo el bienestar de tu equipo. Contáctanos hoy y descubre cómo Asmel Clinic puede ayudar a tu
          empresa a prosperar.
        </p>
        <Link href="/contacto">
          <span className="inline-block bg-blue-600 text-white text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition">
            ¡Contáctanos Ahora!
          </span>
        </Link>
      </section>

      {/* Pie de página */}
      <footer className="bg-gray-200 py-8 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Clinica Asmel. Todos los derechos reservados.
        </p>
      </footer>

    </div>
  );
}
