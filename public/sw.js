const CACHE_NAME = "quran-cache-v1";

self.addEventListener("activate", () => {
  clients.claim();
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(["/", "/manifest.webmanifest", "/icons/icon-192x192.png"])
      )
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
