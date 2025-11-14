// src/utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      auth: {
        token: localStorage.getItem("token") || "",
      },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket.IO conectado con ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket.IO disconnected:", reason);
    });
  }
  return socket;
};
