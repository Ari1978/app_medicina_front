// services/api.js
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  console.error("❌ Falta NEXT_PUBLIC_BACKEND_URL en Vercel");
}

// ------------------ REGISTER ------------------
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error registrando usuario:", err);
    return { error: err.message };
  }
};

// ------------------ LOGIN ------------------
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/api/sessions/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Error logueando usuario:", err);
    return { error: err.message };
  }
};
