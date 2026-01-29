import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";

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
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
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
          
          // Copy service worker to dist root
          const publicSw = path.resolve(__dirname, 'public/sw.js');
          const distSw = path.resolve(__dirname, 'dist/sw.js');
          if (existsSync(publicSw)) {
            copyFileSync(publicSw, distSw);
            console.log('✓ Copied service worker to dist/');
          }
          
          // Copy _headers file for Netlify/Vercel (optional)
          const publicHeaders = path.resolve(__dirname, 'public/_headers');
          const distHeaders = path.resolve(__dirname, 'dist/_headers');
          if (existsSync(publicHeaders)) {
            copyFileSync(publicHeaders, distHeaders);
            console.log('✓ Copied _headers to dist/');
          }
          
          // Copy pubdev data JSON if it exists
          const publicDataDir = path.resolve(__dirname, 'public/data');
          const distDataDir = path.resolve(__dirname, 'dist/data');
          if (existsSync(publicDataDir)) {
            const pubdevJson = path.resolve(publicDataDir, 'pubdev-packages.json');
            if (existsSync(pubdevJson)) {
              if (!existsSync(distDataDir)) {
                mkdirSync(distDataDir, { recursive: true });
              }
              const distJson = path.resolve(distDataDir, 'pubdev-packages.json');
              copyFileSync(pubdevJson, distJson);
              console.log('✓ Copied pubdev-packages.json to dist/data/');
            }
          }
        },
      },
      {
        name: 'inject-lcp-preload',
        writeBundle() {
          // This runs after all files are written
          const distIndexPath = path.resolve(__dirname, 'dist/index.html');
          const distAssetsPath = path.resolve(__dirname, 'dist/assets');
          
          if (existsSync(distIndexPath) && existsSync(distAssetsPath)) {
            let html = readFileSync(distIndexPath, 'utf-8');
            const files = readdirSync(distAssetsPath);
            const ogImageFile = files.find(file => file.startsWith('og-image-') && file.endsWith('.jpg'));
            
            if (ogImageFile) {
              const imagePath = `/jonatasporto/assets/${ogImageFile}`;
              // Check if preload already exists
              if (!html.includes(`href="${imagePath}"`)) {
                const preloadTag = `    <link rel="preload" as="image" href="${imagePath}" fetchpriority="high" />`;
                // Insert after preconnect tags, before Google Fonts comment
                const preconnectEnd = html.indexOf('<!-- Preload LCP image will be injected');
                if (preconnectEnd !== -1) {
                  // Replace the comment with the actual preload tag
                  const commentEnd = html.indexOf('-->', preconnectEnd);
                  if (commentEnd !== -1) {
                    html = html.slice(0, preconnectEnd) + preloadTag + '\n    ' + html.slice(commentEnd + 3);
                    writeFileSync(distIndexPath, html, 'utf-8');
                    console.log('✓ Injected LCP image preload');
                  }
                } else {
                  // Fallback: insert after last preconnect
                  const lastPreconnect = html.lastIndexOf('<link rel="preconnect"');
                  if (lastPreconnect !== -1) {
                    const nextLine = html.indexOf('\n', lastPreconnect);
                    if (nextLine !== -1) {
                      html = html.slice(0, nextLine + 1) + preloadTag + '\n' + html.slice(nextLine + 1);
                      writeFileSync(distIndexPath, html, 'utf-8');
                      console.log('✓ Injected LCP image preload (fallback)');
                    }
                  }
                }
              }
            }
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
