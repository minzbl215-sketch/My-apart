const CACHE_NAME = "lantai-atas-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./story.js",
  "./game.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/companion-mark.png",
  "./assets/user-photo.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for the game's own code/content so a fresh deploy is always
// picked up immediately. Falls back to cache only when offline. Only static
// third-party assets (fonts, etc. — none currently cross-origin) would use
// cache-first; everything in ASSETS is our own code and should stay fresh.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
