"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../AuthContext";

export default function Menu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/loginForm");
  };

  const links = [
    { title: "Inicio", href: "/" },
    { title: "Nosotros", href: "/nosotros" },
    { title: "Servicios", href: "/servicios" },
    { title: "Contacto", href: "/contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/90 backdrop-blur-md shadow-2xl h-16"
          : "bg-transparent backdrop-blur-sm h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-32 h-14 md:w-36 md:h-16">
            <Image
              src="https://www.asmel.com/wp-content/themes/bst-master/img/logo_header2.png"
              alt="Logo Asmel"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <ul className="hidden md:flex space-x-8 items-center text-[15px] font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 ${
                  pathname === link.href ? "text-cyan-400 font-semibold" : ""
                } group`}
              >
                {link.title}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 transition-all duration-300 ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}

          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
              >
                Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/loginForm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
              >
                Acceso a usuarios
              </Link>
            </li>
          )}
        </ul>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-200 hover:text-cyan-400 transition-colors"
        >
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MENÚ MOBILE */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-md border-t border-gray-800 shadow-xl animate-fadeIn">
          <ul className="flex flex-col space-y-5 px-6 py-6 text-lg text-gray-200">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-1 transition-colors ${
                    pathname === link.href
                      ? "text-cyan-400 font-semibold"
                      : "hover:text-cyan-400"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {user ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl font-semibold shadow-md"
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/loginForm"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold shadow-md text-center"
                >
                  Acceso a usuarios
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
