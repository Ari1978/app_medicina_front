import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Detecta si backend local está corriendo
const LOCAL_BACKEND = "http://localhost:4000";
const REMOTE_BACKEND = "https://app-medicina-backend-nnfi.onrender.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    cors: true,

    proxy: {
      "/api": {
        target: LOCAL_BACKEND,    // 👉 primero intenta ir al backend local
        changeOrigin: true,
        secure: false,

        // Si localhost:4000 no está disponible → fallback a Render
        configure: (proxy) => {
          proxy.on("error", () => {
            proxy.options.target = REMOTE_BACKEND;
            console.log("⚠️ Backend local no encontrado → usando Render");
          });
        },
      },
    },
  },

  build: {
    sourcemap: true,
  },
});
