// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.asmel.com" },
      { protocol: "https", hostname: "consultorsalud.com" },
      { protocol: "https", hostname: "prohumanos.com" },
      { protocol: "https", hostname: "www.sistemaimpulsa.com" },
      { protocol: "https", hostname: "blog.omnitok.chat" },
      { protocol: "https", hostname: "www.shutterstock.com" }, // 👈 agregado para que funcione
      { protocol: "https", hostname: "www.apreslaboral.com.ar" },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora ESLint en build
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // backend real
      },
    ];
  },
};

export default nextConfig;
