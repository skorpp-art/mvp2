'''const CACHE_NAME = 'la-brasa-urbana-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './menuData.js',
    './manifest.json',
    './IMAGE/LOGO.png',
    './IMAGE/ICONS/ACOMPAÑAMIENTOS.png',
    './IMAGE/ICONS/BEBIDAS.png',
    './IMAGE/ICONS/ENTRADAS.png',
    './IMAGE/ICONS/POSTRE.png',
    './IMAGE/ICONS/PRINCIPALES.png'
];

// Evento de Instalación: Se dispara cuando el SW se instala.
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache abierto.');
                // Añade todos los recursos fundamentales a la caché.
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Todos los recursos han sido cacheados.');
                // Forza al nuevo SW a activarse inmediatamente.
                return self.skipWaiting();
            })
    );
});

// Evento de Activación: Se dispara después de la instalación. Ideal para limpiar cachés antiguas.
self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Limpiando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => {
            console.log('Service Worker: Reclamando clientes...');
            // Toma el control de las páginas abiertas inmediatamente.
            return self.clients.claim();
        })
    );
});

// Evento Fetch: Se dispara cada vez que la página realiza una petición (ej. a un CSS, JS, o imagen).
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        // Estrategia "Cache First":
        // 1. Intenta encontrar el recurso en la caché.
        caches.match(event.request)
            .then(response => {
                // 2. Si se encuentra en caché, lo devuelve.
                if (response) {
                    console.log('Service Worker: Recurso encontrado en caché:', event.request.url);
                    return response;
                }
                // 3. Si no, intenta obtenerlo de la red.
                console.log('Service Worker: Recurso no encontrado en caché, buscando en red...');
                return fetch(event.request);
            })
            .catch(err => {
                // Manejo de errores, por si falla tanto la caché como la red.
                console.error('Service Worker: Error en fetch', err);
            })
    );
});
''