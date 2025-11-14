
'use client';

import Link from 'next/link';

export default function ResolucionPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Resolución 905/15</h1>

      <p className="mb-6">
        La resolución 905/15 establece la obligación de las empresas de contar con un Servicio de Medicina del Trabajo y otro de Higiene y Seguridad en el Trabajo, especificando las funciones individuales y conjuntas de ambos servicios.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Sus principales objetivos:</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Prevención psicofísica del trabajador mediante funciones mínimas de ambos servicios.</li>
        <li>Generación del Registro digital único de Legajos de Salud, unificando la historia clínica del trabajador.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Actividades conjuntas de ambos servicios (Anexo I):</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Generar Mapa de Riesgo</li>
        <li>Detectar personal expuesto a enfermedades profesionales</li>
        <li>RAR (Relevamiento de Agentes de Riesgo)</li>
        <li>Evaluación de riesgos por puesto</li>
        <li>Medidas correctivas a efectuar</li>
        <li>Verificar acciones realizadas por la ART</li>
        <li>Realización de exámenes periódicos y planes de prevención</li>
        <li>Identificación de riesgos edilicios, ambientales, nutricionales</li>
        <li>Análisis de agua y adecuación de puestos de trabajo</li>
        <li>Charlas de capacitación</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Actividades del Servicio de Medicina Laboral (Anexo III):</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Programa Medicina del Trabajo</li>
        <li>Evaluación de resultados</li>
        <li>Manual de Procedimientos Médicos (enfermería, residuos, confidencialidad, emergencias)</li>
        <li>Visitas a puestos de trabajo para definir exámenes adecuados</li>
        <li>Programa de vigilancia médica (ingreso, periódico, seguimiento, estadísticas de ausentismo)</li>
        <li>Historia clínica digital</li>
        <li>Primeros auxilios y atención de accidentes</li>
        <li>Resolución de consultas del personal</li>
        <li>Plan anual de capacitación</li>
        <li>Seguimiento de patologías laborales y no laborales</li>
      </ul>

      <div className="mt-10 text-center">
        <p className="mb-4 text-lg font-medium">¿Tenés dudas o necesitás más información?</p>
        <Link href="/contact">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition">
            ¡Contáctanos Ahora!
          </button>
        </Link>
      </div>
    </main>
  );
}
