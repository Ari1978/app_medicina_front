// app/lib/socketClient.ts
import { io } from "socket.io-client";

// 🔥 Backend limpio sin barra final + fallback seguro
const API: string = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

// Detectar si es https
const isSecure = API.startsWith("https");

// 🧩 Cliente Socket.IO ultra estable
export const socket = io(API, {
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 8,
  reconnectionDelay: 800,
  transports: ["websocket"],

  // 🔥 NECESARIO PARA RENDER
  path: "/socket.io/",

  // correcto para producción
  secure: isSecure,

  forceNew: false,
});
