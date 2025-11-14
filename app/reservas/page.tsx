"use client";

import { useState } from "react";

export default function ReservarTurnoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    motivo: "",
    tipo: "",
    examen: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert("Turno reservado correctamente.");
      setFormData({
        nombre: "",
        fecha: "",
        hora: "",
        motivo: "",
        tipo: "",
        examen: ""
      });
    } else {
      alert("Error al reservar turno.");
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, motivo: e.target.value });
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        paddingTop: 40,
        paddingBottom: 40,
        display: "flex",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: 30,
            fontWeight: "700",
            fontSize: 28,
            letterSpacing: 1
          }}
        >
          Reservar Turno - Admisión
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <label style={labelStyle}>
            Nombre
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleInputChange("nombre")}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Fecha
            <input
              type="date"
              value={formData.fecha}
              onChange={handleInputChange("fecha")}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Hora
            <input
              type="time"
              value={formData.hora}
              onChange={handleInputChange("hora")}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Tipo
            <select
              value={formData.tipo}
              onChange={handleSelectChange("tipo")}
              style={inputStyle}
              required
            >
              <option value="" disabled>Selecciona tipo</option>
              <option value="abonado">Abonado</option>
              <option value="prestacion">Prestación</option>
            </select>
          </label>

          <label style={labelStyle}>
            Examen
            <select
              value={formData.examen}
              onChange={handleSelectChange("examen")}
              style={inputStyle}
              required
            >
              <option value="" disabled>Selecciona examen</option>
              <option value="pre-ocupacionales">Exámenes Pre-Ocupacionales</option>
              <option value="complementarios">Exámenes Complementarios</option>
            </select>
          </label>

          <label style={labelStyle}>
            Motivo del turno
            <textarea
              placeholder="Motivo del turno (opcional)"
              value={formData.motivo}
              onChange={handleTextareaChange}
              style={{
                ...inputStyle,
                minHeight: 90,
                resize: "vertical"
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: 15,
              padding: "14px 0",
              backgroundColor: "#0070f3",
              color: "#fff",
              fontWeight: "700",
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 112, 243, 0.4)",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005bb5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#0070f3")
            }
          >
            Reservar
          </button>
          <button
  type="button"
  onClick={() => {
    window.open("/api/exportar-excel", "_blank");
  }}
  style={{
    marginTop: 10,
    padding: "12px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.4)",
    transition: "background-color 0.3s"
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
>
  Exportar reservas a Excel
</button>

        </form>
      </div>
    </div>
  );
}

// Estilos reutilizables
const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  color: "#444",
  fontWeight: "600"
};

const inputStyle: React.CSSProperties = {
  marginTop: 8,
  padding: "12px 15px",
  borderRadius: 8,
  border: "1.5px solid #ccc",
  fontSize: 16,
  backgroundColor: "#fff",
  cursor: "pointer",
  transition: "border-color 0.3s",
  outline: "none"
};
