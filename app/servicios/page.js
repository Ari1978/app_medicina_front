"use client";
import ServicioCard from "../Components/Serviciocard";

export default function ServiciosPage() {
  const servicios = [
    {
      titulo: "Exámenes Preocupacionales",
      descripcion:
        "Evaluaciones médicas para determinar la aptitud laboral del trabajador antes de su ingreso.",
      imagen:
        "https://consultorsalud.com/wp-content/uploads/2022/04/Costo-de-examenes-ocupacionales-debe-asumirlo-el-empleador-1024x576.jpg.webp",
    },
    {
      titulo: "Visitas Médicas Domiciliarias",
      descripcion:
        "Atención médica directamente en el lugar de trabajo, reduciendo tiempos y mejorando el seguimiento.",
      imagen:
        "https://prohumanos.com/wp-content/uploads/2022/03/female-support-worker-visits-senior-man-at-home-2021-08-26-16-13-48-utc-300x200.jpg",
    },
    {
      titulo: "Exámenes Complementarios",
      descripcion:
        "Incluye análisis de laboratorio, radiografías, audiometrías, espirometrías, entre otros estudios específicos.",
      imagen:
        "https://www.apreslaboral.com.ar/documentos/1/25_examenes-complementarios.jpg",
    },
    {
      titulo: "Clientes con Abono Mensual",
      descripcion:
        "Planes mensuales que incluyen cobertura médica preventiva, atención continua y beneficios exclusivos.",
      imagen:
        "https://www.sistemaimpulsa.com/blog/wp-content/uploads/2019/03/servicio-clientes-2-696x305.jpg",
    },
    {
      titulo: "Clientes por Prestación",
      descripcion:
        "Atención médica bajo demanda para empresas que requieren servicios puntuales sin suscripción mensual.",
      imagen:
        "https://blog.omnitok.chat/wp-content/uploads/2022/03/nuevo-cliente.jpg",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col gap-10">
      {servicios.map((s, i) => (
        <ServicioCard
          key={i}
          titulo={s.titulo}
          descripcion={s.descripcion}
          imagen={s.imagen}
        />
      ))}
    </main>
  );
}
