"use client";

import AdminStaffPanel from "../Components/AdminStaffPanel";
import UsuarioBuscador from "../Components/UsuarioBuscador";
import BotonVolverWrapper from "../Components/BotonVolver";


export default function PanelAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-4 sm:p-6 md:p-8 text-white flex flex-col gap-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Panel de Administración
      </h1>

      {/* Grid responsive: en md o superior, dos columnas; en mobile, stack vertical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admins + Staff */}
        <div className="w-full overflow-x-auto">
          <AdminStaffPanel />
        </div>

        {/* Buscador de Usuarios */}
        <div className="w-full">
          <UsuarioBuscador />
        </div>
      </div>
      <div className="flex justify-start mt-4">
        <BotonVolverWrapper />
      </div>
    </div>
    
  );
}
