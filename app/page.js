"use client";

import { useState, useEffect } from "react";
import Hero from "./Components/Hero";


export default function Navbar() {
  const [setMobileMenuOpen] = useState(false);

  // Cerrar el menú cuando el tamaño de la pantalla cambia a mayor a 768px
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
  
      {/* Aquí puedes agregar el contenido principal */}
      <Hero />
      
    </section>
  );
}
