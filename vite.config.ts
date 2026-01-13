import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Para GitHub Pages: se o repositório não for username.github.io, 
  // descomente a linha abaixo e substitua 'nome-do-repositorio' pelo nome do seu repo
  // const base = '/nome-do-repositorio/';
  const base = '/';
  
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
