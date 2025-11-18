import { Button } from "@mantine/core";
import { Link } from "react-router-dom";   // ← IMPORTANTE

export default function Navbar() {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}
      <a href="/" className="flex items-center">
        <img
          src="https://www.asmel.com/wp-content/themes/bst-master/img/logo_header2.png"
          alt="ASMEL Logo"
          className="h-12 object-contain"
        />
      </a>

      {/* LINKS */}
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
        {[
          ["Inicio", "#"],
          ["Servicios", "#"],
          ["Nosotros", "#"],
          ["Contacto", "#"],
        ].map(([label, link], idx) => (
          <a
            key={idx}
            href={link}
            className="relative group hover:text-indigo-600 transition"
          >
            {label}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* BOTÓN DE ACCESO */}
      <Link to="/login">
        <Button
          variant="filled"
          color="indigo"
          radius="md"
          size="md"
          className="font-semibold hidden sm:block"
        >
          Acceso de clientes
        </Button>
      </Link>
    </header>
  );
}
