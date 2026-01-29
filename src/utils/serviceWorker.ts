// Service Worker Registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Usa o base path correto do Vite
      const base = import.meta.env.BASE_URL || '/jonatasporto/';
      const swUrl = `${base}sw.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Verifica atualizações periodicamente
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Novo service worker disponível
                  console.log('New service worker available');
                  // Opcional: mostrar notificação para o usuário atualizar
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('SW registration failed: ', error);
        });

      // Verifica atualizações a cada hora
      setInterval(() => {
        navigator.serviceWorker.getRegistration(swUrl).then((registration) => {
          if (registration) {
            registration.update();
          }
        });
      }, 60 * 60 * 1000);
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

