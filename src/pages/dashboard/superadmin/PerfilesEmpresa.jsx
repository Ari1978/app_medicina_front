import { useEffect, useState } from "react";
import { Select, MultiSelect, Button, TextInput, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function PerfilesEmpresa() {
  const API = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form nuevo perfil
  const [nuevoPerfil, setNuevoPerfil] = useState({
    nombrePerfil: "",
    estudios: [],
    descripcion: "",
  });

  const LISTA_ESTUDIOS = [
    "Básico de ley",
    "Audiometría",
    "Espirometría",
    "Rx columna F/P",
    "Electroencefalograma",
    "Psicotécnico",
    "Ergometría",
  ];

  /* ========================================================
     1) Cargar empresas
  ======================================================== */
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/api/admin/usuarios`, {
          credentials: "include",
        });

        if (!r.ok) return;

        const data = await r.json();
        const empresasFiltradas = data.filter((u) => u.role === "user");

        setEmpresas(
          empresasFiltradas.map((e) => ({
            value: e.cuit, // 🔥 AHORA EL VALUE ES EL CUIT
            label: `${e.empresa} (${e.cuit})`,
            cuit: e.cuit,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  /* ========================================================
     2) Cargar perfiles por CUIT
  ======================================================== */
  const cargarPerfiles = async (cuit) => {
    if (!cuit) return;

    setLoading(true);

    try {
      const empresa = empresas.find((e) => e.cuit === cuit);
      setEmpresaSeleccionada(empresa);

      const r = await fetch(`${API}/api/admin/empresa/${cuit}/perfiles`, {
        credentials: "include",
      });

      const data = await r.json();

      setPerfiles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  /* ========================================================
     3) Crear nuevo perfil
  ======================================================== */
  const crearPerfil = async () => {
    if (!empresaSeleccionada) return;

    try {
      const r = await fetch(
        `${API}/api/admin/empresa/${empresaSeleccionada.cuit}/perfiles`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPerfil),
        }
      );

      const data = await r.json();

      if (!r.ok) {
        alert(data.message);
        return;
      }

      setPerfiles(data.perfiles);
      setNuevoPerfil({ nombrePerfil: "", estudios: [], descripcion: "" });
    } catch (e) {
      console.log(e);
    }
  };

  /* ========================================================
     4) Eliminar perfil
  ======================================================== */
  const eliminarPerfil = async (perfilId) => {
    if (!empresaSeleccionada) return;

    if (!confirm("¿Eliminar este perfil?")) return;

    try {
      const r = await fetch(
        `${API}/api/admin/empresa/${empresaSeleccionada.cuit}/perfiles/${perfilId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await r.json();

      if (!r.ok) {
        alert(data.message);
        return;
      }

      // Recargar lista
      const res = await fetch(
        `${API}/api/admin/empresa/${empresaSeleccionada.cuit}/perfiles`,
        { credentials: "include" }
      );

      const nuevos = await res.json();
      setPerfiles(Array.isArray(nuevos) ? nuevos : []);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Botón volver arriba fijo */}
      <div className="p-4">
        <Button onClick={() => navigate("/dashboard/superadmin")}>
          ← Volver
        </Button>
      </div>

      {/* CONTENEDOR SCROLLEABLE */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <Paper p="xl" radius="lg" className="max-w-3xl mx-auto bg-slate-800">
          <h1 className="text-2xl font-bold mb-6">
            Perfiles de Examen por Empresa
          </h1>

          {/* SELECT EMPRESA */}
          <Select
            label="Seleccioná una empresa"
            placeholder="Elegir…"
            data={empresas}
            value={empresaSeleccionada?.cuit || ""}
            onChange={cargarPerfiles}
            searchable
            nothingfound="Sin resultados"
            mb="xl"
          />

          {empresaSeleccionada && (
            <>
              {/* LISTA DE PERFILES */}
              <h2 className="text-xl font-semibold mb-4">
                Perfiles actuales de {empresaSeleccionada.label}
              </h2>

              <div className="space-y-3 mb-8">
                {perfiles.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No hay perfiles cargados.
                  </p>
                )}

                {perfiles.map((p) => (
                  <div
                    key={p._id}
                    className="bg-slate-700 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{p.nombrePerfil}</p>
                      <p className="text-xs text-slate-300">
                        {p.estudios.join(", ")}
                      </p>
                    </div>

                    <Button
                      color="red"
                      size="xs"
                      onClick={() => eliminarPerfil(p._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>

              {/* FORMULARIO NUEVO PERFIL */}
              <h2 className="text-xl font-semibold mb-2">
                Agregar nuevo perfil
              </h2>

              <TextInput
                label="Nombre del perfil"
                placeholder="Ej: Chofer"
                value={nuevoPerfil.nombrePerfil}
                onChange={(e) =>
                  setNuevoPerfil({
                    ...nuevoPerfil,
                    nombrePerfil: e.target.value,
                  })
                }
                mb="sm"
              />

              <MultiSelect
                label="Estudios incluidos"
                placeholder="Seleccionar estudios"
                data={LISTA_ESTUDIOS}
                value={nuevoPerfil.estudios}
                onChange={(value) =>
                  setNuevoPerfil({ ...nuevoPerfil, estudios: value })
                }
                searchable
                mb="sm"
              />

              <TextInput
                label="Descripción (opcional)"
                value={nuevoPerfil.descripcion}
                onChange={(e) =>
                  setNuevoPerfil({
                    ...nuevoPerfil,
                    descripcion: e.target.value,
                  })
                }
                mb="lg"
              />

              <Button onClick={crearPerfil} fullWidth>
                Crear Perfil
              </Button>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}
