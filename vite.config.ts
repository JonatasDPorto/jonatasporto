import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const base = '/jonatasporto/';
  
  return {
    base,
    server: {
      host: "::",
      port: 3254,
      proxy: {
        '/api/pub-dev': {
          target: 'https://pub.dev',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/pub-dev/, '/api'),
          secure: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
