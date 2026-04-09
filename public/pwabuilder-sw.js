
const CACHE = "pwabuilder-offline-V90";
const CACHE_ASSETS = "pwabuilder-assets-V90";
const APP_SHELL_URLS = ["/pga/", "/pga/index.html"];
const OFFLINE_FALLBACK_URL = "/pga/";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "ACTIVATE_NEW_SW") {
    self.skipWaiting();
    self.clients.claim(); 
  }
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .catch(() => undefined)
  );
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE && cacheName !== CACHE_ASSETS) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

workbox.navigationPreload.enable();

workbox.routing.registerRoute(
  new RegExp('^https://pga.cigel.com.br:8095/'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  new RegExp('^https://localhost:8095/'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  new RegExp('^http://10.0.0.158:8091/'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 3,
  })
);

workbox.routing.registerRoute(
  ({ request }) =>
    ["script", "style", "image", "font"].includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE_ASSETS,
  })
);

workbox.routing.setCatchHandler(async ({ event }) => {
  if (event?.request?.mode === "navigate") {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(OFFLINE_FALLBACK_URL);
    return cached || Response.error();
  }
  return Response.error();
});

/*
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Recarregar a página quando o novo Service Worker for ativado.
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: "NEW_VERSION_ACTIVATED" });
    });
  });
});
*/
