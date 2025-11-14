"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../Components/CarritoContext";
import { useAuth } from "../Components/AuthContext";

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { carrito, removeFromCarrito, clearCarrito, confirmarCarrito } = useCarrito();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!carrito) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4">
        Mi Carrito ({carrito.length} turno{carrito.length !== 1 ? "s" : ""})
      </h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600 text-center">
          No hay turnos cargados.
          <button
            className="ml-2 text-blue-600 underline"
            onClick={() => router.push("/turnos")}
          >
            Reservar Turno
          </button>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {carrito.map((turno) => (
              <div
                key={turno._id || `${turno.fecha}-${turno.hora}`}
                className="bg-white shadow rounded p-4 flex justify-between items-start"
              >
                <div>
                  <p><strong>Empleado:</strong> {turno.empleado.nombre} {turno.empleado.apellido}</p>
                  <p><strong>DNI:</strong> {turno.empleado.dni}</p>
                  <p><strong>Puesto:</strong> {turno.puesto}</p>
                  <p><strong>Exámenes:</strong> {turno.examenes?.join(", ")}</p>
                  <p><strong>Fecha:</strong> {turno.fecha}</p>
                  <p><strong>Hora:</strong> {turno.hora}</p>

                  {turno.motivo && (
                    <p><strong>Motivo:</strong> {turno.motivo}</p>
                  )}
                </div>

                <button
                  onClick={async () => {
                    try {
                      if (turno._id) await removeFromCarrito(turno._id);
                    } catch (err) {
                      console.error("❌ Error eliminando turno:", err);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={async () => {
                try {
                  await clearCarrito();
                } catch (err) {
                  console.error("❌ Error vaciando carrito:", err);
                }
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Vaciar Carrito
            </button>

            <button
              onClick={async () => {
                try {
                  await confirmarCarrito();

                  alert("✅ Turnos confirmados correctamente");

                  // 🔥 ES OBLIGATORIO para sincronizar disponibilidad en producción
                  router.replace("/turnos");
                } catch (err) {
                  console.error("❌ Error confirmando turnos:", err);
                  alert("❌ Error al confirmar turnos");
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Confirmar todos los turnos
            </button>
          </div>
        </>
      )}
    </div>
  );
}
