
import DashboardLayout from "../../layout/DashboardLayout";

import StaffHeader from "../../components/dashboard/staff/StaffHeader";
import StaffAgendaHoy from "../../components/dashboard/staff/StaffAgendaHoy";
import PacientesEnEspera from "../../components/dashboard/staff/PacientesEnEspera";
import TurnosPendientes from "../../components/dashboard/staff/TurnosPendientes";
import ExamenesEnProceso from "../../components/dashboard/staff/ExamenesEnProceso";
import NotificacionesStaff from "../../components/dashboard/staff/NotificacionesStaff";
import AccionesStaff from "../../components/dashboard/staff/AccionesStaff";
import RendimientoStaff from "../../components/dashboard/staff/RendimientosStaff";

export default function StaffDashboard() {
  return (
    <DashboardLayout role="staff">

      <StaffHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StaffAgendaHoy />
        <PacientesEnEspera />
        <TurnosPendientes />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ExamenesEnProceso />
        <NotificacionesStaff />
      </div>

      <div className="mt-8">
        <AccionesStaff />
      </div>

      <div className="mt-8">
        <RendimientoStaff />
      </div>

    </DashboardLayout>
  );
}
