import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:8081", // Dirección del backend
        changeOrigin: true,
        secure: false, // Evita verificar certificados SSL (útil si no estás usando HTTPS)
      },
    },
  },
});
