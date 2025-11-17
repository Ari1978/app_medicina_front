
const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export async function asmelGET(url) {
  const res = await fetch(API + url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error: " + url);
  }

  return res.json();
}
