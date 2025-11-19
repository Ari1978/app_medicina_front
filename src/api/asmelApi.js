// src/api.js

const RAW =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:4000"; // fallback local

// 🔧 Normalizamos: sin barra final
export const API = RAW.replace(/\/$/, "");

// Helper opcional para construir URLs
export const buildUrl = (path) =>
  path.startsWith("/") ? `${API}${path}` : `${API}/${path}`;
