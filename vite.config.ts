import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, existsSync } from "fs";

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
    plugins: [
      react(),
      {
        name: 'copy-sitemap',
        closeBundle() {
          // Ensure sitemap.xml is copied correctly after build
          const publicSitemap = path.resolve(__dirname, 'public/sitemap.xml');
          const distSitemap = path.resolve(__dirname, 'dist/sitemap.xml');
          if (existsSync(publicSitemap)) {
            copyFileSync(publicSitemap, distSitemap);
            console.log('✓ Copied sitemap.xml to dist/');
          }
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
