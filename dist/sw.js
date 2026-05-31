const CACHE_NAME = "hisab-finance-v1";
const urlsToCache = [
  "./",
  "./home.html",
  "./login.html",
  "./details.html",
  "./history.html",
  "./custinfo.html",
  "./monthlysales.html",
  "./reports.html",
  "./todaySale.html",
  "./profile.html",
  "./css/main.css",
  "./css/_mixin.scss",
  "./css/_var.scss",
  "./bcgLogo.png",
  "./nav.js",
  "./home.js",
  "./details.js",
  "./history.js",
  "./custinfo.js",
  "./monthlysales.js",
  "./reports.js",
  "./todaySale.js",
  "./profile.js",
  "./login.js",
];

// Install event - cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache opened");
        return cache.addAll(urlsToCache).catch((err) => {
          console.log("Cache addAll error:", err);
        });
      })
      .catch((err) => console.log("Cache open error:", err)),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          // Clone the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return caches.match("./home.html");
      }),
  );
});
