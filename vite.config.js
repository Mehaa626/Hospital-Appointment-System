
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGitHubPages ? "/Hospital-Appointment-System/" : "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Hospital Appointment System",
        short_name: "MediCare",
        description: "Book and manage hospital appointments",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: isGitHubPages
          ? "/Hospital-Appointment-System/"
          : "/"
      }
    })
  ]
});

