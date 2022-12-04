import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { resolve } from "path";

import presetUno from "@unocss/preset-uno";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [presetUno()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
