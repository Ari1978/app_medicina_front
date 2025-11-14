"use client";

import UsuarioImportador from "../../../Components/CrearUsuariosAutorizados";

export default function ImportarUsuariosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Agregar Usuarios</h1>
      <UsuarioImportador />
    </div>
  );
}
