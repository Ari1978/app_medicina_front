import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Empresas from "./components/Empresas";
import Caracteristicas from "./components/Caracteristicas";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Empresas />
      <Caracteristicas />
      <CTA />
      <Footer />
    </>
  );
}
