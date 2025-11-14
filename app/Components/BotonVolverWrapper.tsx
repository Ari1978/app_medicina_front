"use client";

import { usePathname } from "next/navigation";
import BotonVolver from "./BotonVolver";

export default function BotonVolverWrapper() {
  const pathname = usePathname();

  // Rutas donde queremos mostrar el botón
  const mostrarBoton = ["/Cart", "/otra-pagina"].includes(pathname);

  if (!mostrarBoton) return null;

  return (
    <div className="w-full flex justify-center py-4">
      <BotonVolver />
    </div>
  );
}

