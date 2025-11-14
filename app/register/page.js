import RegisterForm from "../Components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] px-4">
      {/* Contenedor del formulario centrado */}
      <div className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}


