// Service Worker para cache de longo prazo dos assets
// Cache TTL: 1 ano para assets com hash, 1 dia para outros recursos

const CACHE_NAME = 'jonatasporto-v1';
const STATIC_CACHE_TTL = 365 * 24 * 60 * 60 * 1000; // 1 ano em milissegundos
const DYNAMIC_CACHE_TTL = 24 * 60 * 60 * 1000; // 1 dia em milissegundos

// Assets que devem ser cacheados permanentemente (têm hash no nome)
const STATIC_ASSETS_PATTERNS = [
  /\/assets\/.*-[a-zA-Z0-9]{8,}\.(js|css|jpg|png|webp|svg)$/,
  /\/assets\/.*\.(woff2|woff|ttf|eot)$/,
];

// Verifica se um recurso é um asset estático (com hash)
function isStaticAsset(url) {
  return STATIC_ASSETS_PATTERNS.some(pattern => pattern.test(url));
}

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting(); // Ativa imediatamente
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignora requisições de API externas
  if (url.origin !== self.location.origin && !url.href.includes('api.allorigins.win')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Se encontrou no cache, retorna
      if (cachedResponse) {
        // Verifica se o cache ainda é válido
        const cacheDate = cachedResponse.headers.get('sw-cache-date');
        if (cacheDate) {
          const age = Date.now() - parseInt(cacheDate);
          const ttl = isStaticAsset(request.url) ? STATIC_CACHE_TTL : DYNAMIC_CACHE_TTL;
          
          if (age < ttl) {
            return cachedResponse;
          } else {
            // Cache expirado, remove e busca novamente
            caches.delete(request);
          }
        } else {
          return cachedResponse;
        }
      }

      // Busca da rede
      return fetch(request)
        .then((response) => {
          // Só cacheia respostas válidas
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clona a resposta para cache
          const responseToCache = response.clone();

          // Adiciona header de data do cache
          const headers = new Headers(responseToCache.headers);
          headers.set('sw-cache-date', Date.now().toString());

          const modifiedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers: headers,
          });

          // Armazena no cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, modifiedResponse);
          });

          return response;
        })
        .catch(() => {
          // Se falhar e tiver cache antigo, retorna ele mesmo expirado
          if (cachedResponse) {
            return cachedResponse;
          }
        });
    })
  );
});

