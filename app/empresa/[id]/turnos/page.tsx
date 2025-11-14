"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Turno {
  _id: string;
  empleado: { nombre: string; apellido: string; dni: string };
  puesto: string;
  examenes: string[];
  contacto: { nombre: string; celular: string };
  fecha: string;
  user: string;
}

interface User {
  _id: string;
  nombre: string;
  cuit: string;
  email?: string;
}

export default function TurnosUserPage() {
  const params = useParams();
  const userId = params.id;

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cantidadTurnos, setCantidadTurnos] = useState(20);
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ BACKEND REAL
  const API = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

  if (!API) console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/turnos/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Error al cargar datos del usuario");

        const data = await res.json();
        setUser(JSON.parse(JSON.stringify(data.user)));
        setTurnos(JSON.parse(JSON.stringify(data.turnos)));
      } catch (err: any) {
        setError(err.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId, token, API]);

  const toggleSeleccionado = (id: string) => {
    setSeleccionados((prev) => {
      const copia = new Set(prev);
      copia.has(id) ? copia.delete(id) : copia.add(id);
      return copia;
    });
  };

  const toggleSeleccionarTodos = () => {
    const visibles = turnos.slice(0, cantidadTurnos).map((t) => t._id);
    const allSelected = visibles.every((id) => seleccionados.has(id));

    setSeleccionados((prev) => {
      const copia = new Set(prev);
      allSelected
        ? visibles.forEach((id) => copia.delete(id))
        : visibles.forEach((id) => copia.add(id));
      return copia;
    });
  };

  const handleEliminar = async (id: string) => {
    if (!confirm("¿Seguro querés eliminar este turno?")) return;

    try {
      const res = await fetch(`${API}/api/turnos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al eliminar el turno");

      setTurnos((prev) => prev.filter((t) => t._id !== id));
      setSeleccionados((prev) => {
        const copia = new Set(prev);
        copia.delete(id);
        return copia;
      });
    } catch (err: any) {
      alert(err.message || "Error al eliminar turno");
    }
  };

  const handleEliminarSeleccionados = async () => {
    if (seleccionados.size === 0)
      return alert("No hay turnos seleccionados");

    if (
      !confirm(
        `¿Seguro querés eliminar ${seleccionados.size} turnos seleccionados?`
      )
    )
      return;

    try {
      for (let id of Array.from(seleccionados).slice(0, 20)) {
        const res = await fetch(`${API}/api/turnos/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Error al eliminar el turno ${id}`);
      }

      setTurnos((prev) => prev.filter((t) => !seleccionados.has(t._id)));
      setSeleccionados(new Set());
    } catch (err: any) {
      alert(err.message || "Error al eliminar turnos seleccionados");
    }
  };

  if (loading) return <p className="text-gray-700">Cargando datos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const visibles = turnos.slice(0, cantidadTurnos);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6 bg-gray-800 p-4 rounded">
        {user?.nombre || "Desconocido"}
      </h1>

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="cantidadTurnos" className="font-medium">
          Mostrar:
        </label>
        <select
          id="cantidadTurnos"
          value={cantidadTurnos}
          onChange={(e) => setCantidadTurnos(Number(e.target.value))}
          className="border rounded p-1"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span>turnos</span>

        <label className="flex items-center ml-4">
          <input
            type="checkbox"
            checked={visibles.every((t) => seleccionados.has(t._id))}
            onChange={toggleSeleccionarTodos}
            className="mr-2"
          />
          Seleccionar todos
        </label>

        <button
          onClick={handleEliminarSeleccionados}
          className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar seleccionados
        </button>
      </div>

      {turnos.length === 0 ? (
        <p className="text-gray-700">No hay turnos para este usuario.</p>
      ) : (
        <ul className="space-y-4">
          {visibles.map((t) => (
            <li
              key={t._id}
              className="p-4 border rounded bg-gray-50 shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="text-gray-900">
                  <strong>Empleado:</strong> {t.empleado.nombre}{" "}
                  {t.empleado.apellido} (DNI: {t.empleado.dni})
                </p>
                <p className="text-gray-800">
                  <strong>Puesto:</strong> {t.puesto}
                </p>
                {t.examenes.length > 0 && (
                  <p className="text-gray-800">
                    <strong>Exámenes:</strong> {t.examenes.join(", ")}
                  </p>
                )}
                <p className="text-gray-800">
                  <strong>Contacto:</strong> {t.contacto.nombre} -{" "}
                  {t.contacto.celular}
                </p>
                <p className="text-gray-800">
                  <strong>Fecha:</strong>{" "}
                  {new Date(t.fecha).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <input
                  type="checkbox"
                  checked={seleccionados.has(t._id)}
                  onChange={() => toggleSeleccionado(t._id)}
                  className="mb-2"
                />
                <button
                  onClick={() => handleEliminar(t._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
