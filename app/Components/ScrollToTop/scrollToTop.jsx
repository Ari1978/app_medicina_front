'use client';
import { useState, useEffect } from 'react';
import styles from './scroll.module.css'; // Creamos un CSS para el botón

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`${styles.scrollTop} ${visible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Subir al inicio"
    >
      ↑
    </button>
  );
}

