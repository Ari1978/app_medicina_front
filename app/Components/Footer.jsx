"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-950 to-black text-gray-300 relative overflow-hidden">
      {/* Fondo decorativo con blur sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-16 flex flex-col items-center">
        {/* Secciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center border-b border-gray-700/60 pb-10">
          
          {/* Logo y descripción */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link href="/" className="flex items-center justify-center group">
              <div className="relative w-36 h-24 md:w-40 md:h-28 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="https://www.asmel.com/wp-content/themes/bst-master/img/logo_header2.png"
                  alt="Logo Asmel"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                />
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs text-sm sm:text-base">
              Asmel es líder en soluciones integrales de medicina laboral para tu empresa.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-white mb-5 tracking-wide uppercase">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
                { name: "Nosotros", href: "/nosotros" },
                { name: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative group text-gray-300 hover:text-cyan-400 transition"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto y redes */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-white mb-5 tracking-wide uppercase">
              Contacto
            </h3>
            <div className="space-y-3 text-gray-400 text-sm sm:text-base">
              <p className="flex items-center justify-center gap-2">
                <FiMapPin className="text-cyan-400" />
                <span>Calle Ugarte 3141/45, Olivos, Buenos Aires</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <FiPhone className="text-cyan-400" />
                <span>+011 4796-1920</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <FiMail className="text-cyan-400" />
                <a
                  href="mailto:info@asmel.com"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  info@asmel.com
                </a>
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center gap-6 mt-6">
              {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-xs sm:text-sm text-gray-500 select-none tracking-wide">
          © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Asmel</span>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
