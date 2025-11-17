
import { Routes, Route } from "react-router-dom";
import EmpresaDashboard from "../pages/dashboard/EmpresaDashboard";

// Si más adelante agregás módulos de empresa, los importás acá:
// import Ausentismo from "../pages/dashboard/empresa/Ausentismo";
// import Examenes from "../pages/dashboard/empresa/Examenes";
// import VisitasDomiciliarias from "../pages/dashboard/empresa/Visitas";
// import Documentacion from "../pages/dashboard/empresa/Documentacion";
// import Facturacion from "../pages/dashboard/empresa/Facturacion";

export default function EmpresaRoutes() {
  return (
    <Routes>

      {/* Dashboard principal */}
      <Route path="/" element={<EmpresaDashboard />} />

      {/* Módulos adicionales de Empresa (cuando los actives) */}
      {/* <Route path="ausentismo" element={<Ausentismo />} /> */}
      {/* <Route path="examenes" element={<Examenes />} /> */}
      {/* <Route path="visitas-domiciliarias" element={<VisitasDomiciliarias />} /> */}
      {/* <Route path="documentacion" element={<Documentacion />} /> */}
      {/* <Route path="facturacion" element={<Facturacion />} /> */}

    </Routes>
  );
}
