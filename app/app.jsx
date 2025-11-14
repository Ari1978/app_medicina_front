import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import TurnoForm from "./Components/TurnoForm";
import TurnosDisponibles from "./Components/TurnosDisponibles";
import { turnoApi } from "./api/turnoApi";

const socket = io("http://localhost:3000");

export default function App() {
  const empresaId = "64f5c6e7a0f123456789abcd"; // ID de ejemplo
  const [turnos, setTurnos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchTurnos = async () => {
    const data = await turnoApi.listarPorEmpresa(empresaId);
    setTurnos(data);
  };

  useEffect(() => {
    fetchTurnos();
    socket.on("turnosActualizados", (data) => {
      if (data.empresaId === empresaId) setRefresh(r => !r);
    });
    return () => socket.off("turnosActualizados");
  }, []);

  useEffect(() => { fetchTurnos(); }, [refresh]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900">Turnera Real-Time</h1>
      <TurnoForm empresaId={empresaId} onTurnoCreado={() => setRefresh(r => !r)} />
      <TurnosDisponibles turnos={turnos} />
    </div>
  );
}

