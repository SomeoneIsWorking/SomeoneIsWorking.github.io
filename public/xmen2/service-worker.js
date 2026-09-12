/* Rendered by the consumer's packager. Only explicitly listed redistributable
 * application resources are cached. Player files remain exclusively in OPFS. */
const RELEASE = {"version": "b89eb5fd48d9b3e85de157713416c1b5aaa94d3c1c5988e99012df19155a4e8d", "files": ["app.mjs", "icon-192.png", "icon-512.png", "index.html", "isolation.mjs", "manifest.webmanifest", "storage.mjs", "style.css", "x2native.data", "x2native.js", "x2native.wasm"]};
const cachePrefix = `lucent-app:${self.registration.scope}:`;
const cacheName = cachePrefix + RELEASE.version;
const assets = new Set(RELEASE.files.map(path => new URL(path, self.registration.scope).href));

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([...assets])));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(cachePrefix) && key !== cacheName) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.href === self.registration.scope) url.pathname += "index.html";
  if (!assets.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(url.href);
    if (!response) throw new Error(`Application resource absent from release cache: ${url.pathname}`);
    const headers = new Headers(response.headers);
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  })());
});
