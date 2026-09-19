/* Rendered by the consumer's packager. Only explicitly listed redistributable
 * application resources are cached. Player files remain exclusively in OPFS. */
const RELEASE = {"version": "784ab9bca2739c573225fa4dea8972d0390e799f4447ceca08cea09cd240e85c", "files": ["app.mjs", "canvas.mjs", "index.html", "isolation.mjs", "lf2.js", "lf2.wasm", "manifest.webmanifest", "storage.mjs", "style.css"], "hashes": {"app.mjs": "7b9470b1831c7753b4a2254316b7cdaed3fe525510123b1bcf86e7f539c3cf77", "canvas.mjs": "fc58ed7583121766ba2ae7538ce2e73bf6a04cf779e0b9a0f73523e6526dc418", "index.html": "2557f7e168fa73631314a0a45d8dfe556851c6ef96dbefc508b22b3416a0b54f", "isolation.mjs": "c27cc11bd31f573ad7f71c0a844c2b6a501dc3eee5a187740291c4e34339e367", "lf2.js": "ffca6ec910319246aa95de55828e7d03197890fe2a711bb8f6bbc5d11c8da7dd", "lf2.wasm": "ab14cff7fc65f975a99138184b98b0895dd43b858ba8cd8871627c41c5b3ffd6", "manifest.webmanifest": "308af08f83c5b71072a5737622d750d3147397cd0b780fb9ab33f635cb72e4ab", "storage.mjs": "4bd0ffab16bd2255d3fd0505d8d9c96d163c214d1992d7c7d13522cfa397f7f5", "style.css": "d16ecb251d7d857f74c22c8b9f68c103c3ada0a39f750fcf870d950d4f30d288"}};
const cachePrefix = `web-port-app:${self.registration.scope}:`;
const cacheName = cachePrefix + RELEASE.version;
const assets = new Set(RELEASE.files.map(path => new URL(path, self.registration.scope).href));

function releaseName(url) {
  return new URL(url).pathname.split("/").pop();
}

function hex(bytes) {
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

/* Populate the release cache from the network and refuse any body whose digest
 * is not the one this release was addressed with. cache.addAll() would accept a
 * response out of the browser's HTTP cache, so a browser that had loaded the
 * previous deployment could store those bytes under this release's version name
 * and serve them for as long as that version stayed current. */
async function fetchVerified(url) {
  const response = await fetch(url, {cache: "reload"});
  if (!response.ok) {
    throw new Error(`Application resource unavailable: ${url}`);
  }
  const expected = RELEASE.hashes[releaseName(url)];
  if (!expected) {
    throw new Error(`Application resource is absent from the release hashes: ${url}`);
  }
  const observed = hex(await crypto.subtle.digest("SHA-256", await response.clone().arrayBuffer()));
  if (observed !== expected) {
    throw new Error(`Application resource does not match its release hash: ${url}`);
  }
  return response;
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    // Verify every body before writing any of them, so an install that must be
    // refused does not leave a partially populated release behind.
    const verified = await Promise.all(
      [...assets].map(async url => [url, await fetchVerified(url)])
    );
    const cache = await caches.open(cacheName);
    await Promise.all(verified.map(([url, response]) => cache.put(url, response)));
    // Otherwise the new worker waits for every client of the old one to close,
    // and a player who keeps the page open never receives the new release.
    // Activation claims the open clients, so the next load serves it.
    await self.skipWaiting();
  })());
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
