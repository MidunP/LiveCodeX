import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router"],
          "vendor-clerk": ["@clerk/clerk-react"],
          "vendor-stream": ["stream-chat", "stream-chat-react", "@stream-io/video-react-sdk"],
          "vendor-monaco": ["@monaco-editor/react"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": ["lucide-react", "react-hot-toast", "canvas-confetti", "react-resizable-panels"],
        },
      },
    },
  },
});
