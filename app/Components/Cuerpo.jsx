'use client';
import ServicioCard from './Serviciocard';

export default function Cuerpo() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-400 drop-shadow-md">
          Nuestros Servicios
        </h2>

        <ServicioCard
          titulo="Exámenes Preocupacionales"
          descripcion="Evaluaciones médicas para determinar la aptitud laboral del trabajador antes de su ingreso."
          imagen="https://consultorsalud.com/wp-content/uploads/2022/04/Costo-de-examenes-ocupacionales-debe-asumirlo-el-empleador-1024x576.jpg.webp"
        />

        <ServicioCard
          titulo="Visitas Médicas Domiciliarias"
          descripcion="Atención médica directamente en el lugar de trabajo, reduciendo tiempos y mejorando el seguimiento."
          imagen="https://media.licdn.com/dms/image/v2/D4E12AQFvcseIEnxWBg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1681155734924?e=1755734400&v=beta&t=SxeywEKMSHdmEw5x7JhLK9QWKs8ByP1Pn15P18weAUM"
        />

        <ServicioCard
          titulo="Exámenes Complementarios"
          descripcion="Incluye análisis de laboratorio, radiografías, audiometrías, espirometrías, entre otros estudios específicos."
          imagen="https://scontent.faep6-1.fna.fbcdn.net/v/t39.30808-6/463341271_8437266829691733_5311653657895231500_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeHxJq_dyACwOfkb9vQKEIeWWzZZsE17_QFbNlmwTXv9ARaOYlpV-BwgFitlSJ5DPJd3sEAgZ2KBJjpftOIgtstq&_nc_ohc=bUPaXBR2i00Q7kNvwHd4zST&_nc_oc=AdmzwlL0SpRIuFeO0TUFbU6ubBtnZXKp9PByehWbK2TuLxQsH9AerO6IPBO5AvvFchw&_nc_zt=23&_nc_ht=scontent.faep6-1.fna&_nc_gid=WqbdIYvjNGNrt0WY8zLKdg&oh=00_AfNQ9QliCAxJtPKT7U8hTsJBzDNo9J6-1MS5BVmw1Ff2nw&oe=6853EFBC"
        />

        <ServicioCard
          titulo="Clientes con Abono Mensual"
          descripcion="Planes mensuales que incluyen cobertura médica preventiva, atención continua y beneficios exclusivos."
          imagen="https://www.sistemaimpulsa.com/blog/wp-content/uploads/2019/03/servicio-clientes-2-696x305.jpg"
        />

        <ServicioCard
          titulo="Clientes por Prestación"
          descripcion="Atención médica bajo demanda para empresas que requieren servicios puntuales sin suscripción mensual."
          imagen="https://blog.omnitok.chat/wp-content/uploads/2022/03/nuevo-cliente.jpg"
        />
      </div>
    </section>
  );
}
