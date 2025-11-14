"use client";

import { useState } from "react";
import BotonVolverWrapper from "../Components/BotonVolver";
import styles from "../styles/contact.module.css"; // ✅ ruta correcta

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setError("Por favor, completa todos los campos.");
      setEnviado(false);
      return;
    }

    // Simulación de envío
    setTimeout(() => {
      setEnviado(true);
      setError("");
      setNombre("");
      setEmail("");
      setMensaje("");
    }, 1000);
  };

  return (
    <main className={styles["contact-main"]}>
      <h1 className={styles["contact-title"]}>Formulario de Contacto</h1>
      <p className={styles["contact-description"]}>
        Completa el formulario y nuestro equipo se pondrá en contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className={styles["contact-form"]}>
        {error && <p className={styles["contact-error"]}>{error}</p>}
        {enviado && (
          <p className={styles["contact-success"]}>
            ¡Mensaje enviado con éxito!
          </p>
        )}

        <label>Nombre</label>
        <input
          type="text"
          className={styles["contact-input"]}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          className={styles["contact-input"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mensaje</label>
        <textarea
          className={styles["contact-textarea"]}
          rows="5"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>

        <button type="submit" className={styles["contact-button"]}>
          Enviar mensaje
        </button>
      </form>

      {/* 🔙 Botón volver debajo del formulario */}
      <div className="flex justify-start mt-6">
        <BotonVolverWrapper />
      </div>
    </main>
  );
}
