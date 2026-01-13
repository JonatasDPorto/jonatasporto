import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Para GitHub Pages: ajuste o base path conforme o nome do seu repositório
  // Se o repo for 'username.github.io', use '/'
  // Se o repo tiver outro nome (como 'jonatasporto'), use '/nome-do-repo/'
  const base = '/jonatasporto/';
  
  return {
    base,
    server: {
      host: "::",
      port: 3254,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
