const CACHE_NAME = "registrasi-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/data.html",
  "/css/bootstrap.min.css",
  "/css/bootstrap-icons.css",
  "/css/dataTables.bootstrap5.min.css",
  "/css/buttons.bootstrap5.min.css",
  "/js/jquery.js",
  "/js/bootstrap.bundle.min.js",
  "/js/bootstrap.min.js",
  "/js/datatables.min.js",
  "/js/dataTables.bootstrap5.min.js",
  "/js/dataTables.buttons.min.js",
  "/js/buttons.bootstrap5.min.js",
  "/js/jszip.min.js",
  "/js/pdfmake.min.js",
  "/js/vfs_fonts.js",
  "/js/buttons.html5.min.js",
  "/js/service-worker.js",
  "/Assets/favicon.png",
  "/Assets/logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
