
const API = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000")
  .replace(/\/$/, ""); // elimina barra final si existe

export async function asmelGET(url) {
  const res = await fetch(API + url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // backend devolvió vacío → evitar crash
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || `Error GET ${url}`);
  }

  return data;
}
