"use client";
import styles from "../../app/styles/nosotros.module.css";

export default function Nosotros() {
  return (
    <section className={styles["about-section"]}>
      <div className={styles["about-card"]}>
        <h2 className={styles["about-title"]}>
          ¿Quién es <span className={styles.highlight}>Asmel?</span>
        </h2>

        <p className={styles["about-text"]}>
          Asmel es una organización profesional de servicios de salud para empresas, 
          con más de 35 años de trayectoria atendiendo a una amplia cartera de clientes.
        </p>

        <p className={styles["about-text"]}>
          Nuestra misión es optimizar la capacidad productiva de los recursos humanos,
          asegurando cumplimiento legal y bienestar laboral.
        </p>

       <p className={styles["about-text"]}>
  Brindamos servicios de salud adaptados a las necesidades de tu empresa, 
  con un equipo de profesionales altamente capacitados y comprometidos con tu bienestar laboral.
</p>


        <p className={styles["about-values-title"]}>Nuestros valores:</p>
        <ul className={styles["about-values"]}>
          <li>Profesionalismo y ética en cada servicio.</li>
          <li>Prevención y bienestar laboral como prioridad.</li>
          <li>Atención personalizada y asesoramiento integral.</li>
          <li>Compromiso con la seguridad de los empleados.</li>
        </ul>

        <p className={styles["about-contact"]}>
          ¿Querés saber más?{" "}
          <a href="/contacto" className={styles["contact-btn"]}>
            Contactanos
          </a>
        </p>
      </div>
    </section>
  );
}
