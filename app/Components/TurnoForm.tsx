"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaShoppingCart } from "react-icons/fa";
import { es } from "date-fns/locale/es";
import { FRANJAS } from "./FranjaHoraria";
import { useAuth } from "./AuthContext";
import { useCarrito } from "./CarritoContext";

registerLocale("es", es);

const MAX_TURNOS_POR_HORA = 5;

// 🔥 URL GLOBAL BACKEND
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
if (!API_URL) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");

// -------- Tipos --------
type Empleado = { nombre: string; apellido: string; dni: string };
type Contacto = { nombre: string; celular: string };

type TurnoPayload = {
  empleado: Empleado;
  contacto: Contacto;
  puesto: string;
  motivo: string;
  examenes: string[];
  fecha: string;
  hora: string;
  provisional?: boolean;
  user: string;
};

type HorarioDisponible = { hora: string; disponibles: number };

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;
  return <>{children}</>;
}

export default function TurnoForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { carrito, addToCarrito } = useCarrito();

  const [empleado, setEmpleado] = useState<Empleado>({ nombre: "", apellido: "", dni: "" });
  const [puesto, setPuesto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [examenes, setExamenes] = useState<string[]>([]);
  const [examenesAdicionales, setExamenesAdicionales] = useState<string[]>([]);
  const [contacto, setContacto] = useState<Contacto>({ nombre: "", celular: "" });
  const [fecha, setFecha] = useState<Date | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDisponible[]>([]);

  const examenesMap: Record<string, string[]> = {
    Administrativo: ["Básico de ley"],
    "Operario/a": ["Básico de ley", "Audiometría"],
    Chofer: ["Básico de ley", "Audiometría", "Espirometría"],
    "Operario altura/confinados": ["Básico de ley", "Espirometría"],
    "Vendedor/a": ["Básico de ley"],
    "Empleado de sistemas": ["Básico de ley"],
  };

  const examenesOpcionales = [
    "Audiometría",
    "Rx columna F/P",
    "Rx cervical F/P",
    "Espirometría",
    "Laboratorio completo",
    "Electrocardiograma",
    "Análisis de sangre",
    "Visiometría",
  ];

  const feriados = ["2025-12-25", "2025-01-01", "2025-05-01"];

  const soloLetras = (v: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(v);
  const soloNumeros = (v: string) => /^[0-9]+$/.test(v);

  const handlePuestoChange = (value: string) => {
    setPuesto(value);
    setExamenes(examenesMap[value] || []);
  };

  // ------------------------------------------------------------------------------------
  // 🔥 CUPOS DISPONIBLES (confirmados + carrito)
  // ------------------------------------------------------------------------------------
  useEffect(() => {
    if (!fecha || !user) {
      setHorariosDisponibles([]);
      return;
    }

    const isoFecha = fecha.toISOString().split("T")[0];

    const cargarHorarios = async () => {
      try {
        // Confirmados
        const resConfirm = await fetch(
          `${API_URL}/api/turnos/confirmados?fecha=${isoFecha}`,
          { credentials: "include" }
        );
        const confirmados = resConfirm.ok ? await resConfirm.json() : [];

        const mapConfirm: Record<string, number> = {};
        confirmados.forEach((t: any) => {
          mapConfirm[t.hora] = (mapConfirm[t.hora] || 0) + 1;
        });

        // Provisionales del carrito
        const resCarrito = await fetch(`${API_URL}/api/carrito`, {
          credentials: "include",
        });
        const carritoProv = resCarrito.ok ? await resCarrito.json() : [];

        const mapProv: Record<string, number> = {};
        carritoProv.forEach((t: any) => {
          if (t.fecha === isoFecha) {
            mapProv[t.hora] = (mapProv[t.hora] || 0) + 1;
          }
        });

        const horarios = FRANJAS.map((hora) => {
          const usadosConfirm = mapConfirm[hora] || 0;
          const usadosProv = mapProv[hora] || 0;
          const libres = MAX_TURNOS_POR_HORA - usadosConfirm - usadosProv;
          return { hora, disponibles: libres > 0 ? libres : 0 };
        });

        setHorariosDisponibles(horarios);
      } catch (e) {
        console.error("❌ Error cargando horarios:", e);
        setHorariosDisponibles([]);
      }
    };

    cargarHorarios();
  }, [fecha, user]);

  // ------------------------------------------------------------------------------------
  // 🔥 SUBMIT → agregar carrito
  // ------------------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Debe iniciar sesión");
    if (!fecha || !horaSeleccionada) return alert("Debe seleccionar fecha y hora");
    if (!motivo) return alert("Seleccione un motivo");
    if (!empleado.nombre || !empleado.apellido || !empleado.dni)
      return alert("Complete los datos del empleado");
    if (!puesto) return alert("Seleccione puesto");
    if (!contacto.nombre || !contacto.celular)
      return alert("Complete datos de contacto");

    const ownerId = user.id || user._id || "";

    const payload: TurnoPayload = {
      empleado,
      contacto,
      puesto,
      motivo,
      examenes: [...examenes, ...examenesAdicionales],
      fecha: fecha.toISOString().split("T")[0],
      hora: horaSeleccionada,
      provisional: true,
      user: ownerId,
    };

    try {
      await addToCarrito(payload);
      router.push("/Cart");
    } catch {
      alert("❌ No se pudo agregar el turno");
    }
  };

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const str = date.toISOString().split("T")[0];
    return day === 0 || feriados.includes(str);
  };

  // ------------------------------------------------------------------------------------

  return (
    <main className="top-10 flex flex-col items-center w-full min-h-screen py-10 relative">
      
      {/* Carrito flotante */}
      <div
        className="fixed top-28 right-5 z-50 cursor-pointer flex flex-col items-center justify-center"
        onClick={() => router.push("/Cart")}
      >
        <div className="relative transform rotate-12 scale-110 shadow-lg">
          <FaShoppingCart className="text-4xl text-blue-400" />
          {carrito.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {carrito.length}
            </span>
          )}
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col gap-4 p-6 sm:p-10 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-100 text-center">Reserva de Turno</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* -------- EMPLEADO -------- */}
          <input
            placeholder="Nombre"
            value={empleado.nombre}
            onChange={(e) =>
              (soloLetras(e.target.value) || e.target.value === "") &&
              setEmpleado({ ...empleado, nombre: e.target.value })
            }
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          />

          <input
            placeholder="Apellido"
            value={empleado.apellido}
            onChange={(e) =>
              (soloLetras(e.target.value) || e.target.value === "") &&
              setEmpleado({ ...empleado, apellido: e.target.value })
            }
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          />

          <input
            placeholder="DNI"
            value={empleado.dni}
            onChange={(e) =>
              ((soloNumeros(e.target.value) && e.target.value.length <= 8) ||
                e.target.value === "") &&
              setEmpleado({ ...empleado, dni: e.target.value })
            }
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          />

          {/* -------- MOTIVO -------- */}
          <select
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          >
            <option value="">Seleccione motivo</option>
            <option value="05">Ingreso</option>
            <option value="06">Egreso</option>
            <option value="07">Periódico</option>
            <option value="57">Pendiente</option>
            <option value="22">Estudios</option>
            <option value="31">Complementario</option>
          </select>

          {/* -------- PUESTO -------- */}
          <select
            value={puesto}
            onChange={(e) => handlePuestoChange(e.target.value)}
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          >
            <option value="">Seleccione puesto</option>
            {Object.keys(examenesMap).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* -------- EXÁMENES BASE -------- */}
          <input
            type="text"
            value={examenes.join(", ")}
            readOnly
            className="border p-2 rounded bg-gray-200 text-gray-800"
          />

          {/* -------- EXÁMENES EXTRA -------- */}
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val && !examenesAdicionales.includes(val)) {
                setExamenesAdicionales([...examenesAdicionales, val]);
              }
            }}
            className="border p-2 rounded bg-white/30 text-gray-900"
          >
            <option value="">Agregar examen adicional…</option>
            {examenesOpcionales.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-1">
            {examenesAdicionales.map((ex) => (
              <span
                key={ex}
                className="bg-blue-100 px-2 py-1 rounded flex items-center text-gray-900"
              >
                {ex}
                <button
                  type="button"
                  onClick={() =>
                    setExamenesAdicionales(
                      examenesAdicionales.filter((a) => a !== ex)
                    )
                  }
                  className="ml-1 text-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>

          {/* -------- CONTACTO -------- */}
          <input
            placeholder="Contacto nombre"
            value={contacto.nombre}
            onChange={(e) =>
              (soloLetras(e.target.value) || e.target.value === "") &&
              setContacto({ ...contacto, nombre: e.target.value })
            }
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          />

          <input
            placeholder="Celular"
            value={contacto.celular}
            onChange={(e) =>
              ((soloNumeros(e.target.value) && e.target.value.length <= 15) ||
                e.target.value === "") &&
              setContacto({ ...contacto, celular: e.target.value })
            }
            required
            className="border p-2 rounded bg-white/30 text-gray-900"
          />

          {/* -------- FECHA -------- */}
          <ClientOnly>
            <div>
              <p className="font-semibold mb-1 text-gray-100">Seleccione fecha:</p>
              <DatePicker
                selected={fecha}
                onChange={(d) => setFecha(d)}
                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                placeholderText="Seleccione fecha"
                className="w-full p-2 rounded border bg-white/30 text-gray-900"
                locale="es"
                filterDate={(d) => !isDateDisabled(d)}
              />
            </div>
          </ClientOnly>

          {/* -------- HORARIOS -------- */}
          {horariosDisponibles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {horariosDisponibles.map((h) => (
                <button
                  key={h.hora}
                  type="button"
                  disabled={h.disponibles <= 0}
                  className={`border px-2 py-1 rounded ${
                    h.hora === horaSeleccionada ? "bg-blue-500 text-white" : ""
                  } ${
                    h.disponibles <= 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setHoraSeleccionada(h.hora)}
                >
                  {h.hora} ({h.disponibles})
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
            >
              Volver
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Agregar al carrito
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
