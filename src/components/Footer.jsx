
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-6">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">ASMEL</h2>
          <p className="text-sm">Soluciones en Medicina Laboral</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacidad</a>
          <a href="#" className="hover:text-white">Términos</a>
          <a href="#" className="hover:text-white">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
