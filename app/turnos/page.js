import TurnoForm from "../Components/TurnoForm";

export default function TurnoFormPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] px-4">
      <div className="flex-1 flex items-center justify-center">
        <TurnoForm />
      </div>
    </div>
  );
}
