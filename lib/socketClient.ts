// app/lib/socketClient.ts
import { io } from "socket.io-client";

// 🔥 Usa la variable correcta y asegurate de que no tenga barra final
const API = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

if (!API) {
  console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel (Socket)");
}

// 🧩 Cliente Socket.IO global
export const socket = io(API, {
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ["websocket"],
});
