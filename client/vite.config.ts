import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration using defineConfig function
// For more details, refer to: https://vitejs.dev/config/
// Proxy target for requests starting with "/api"
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },

  plugins: [react()],
});
