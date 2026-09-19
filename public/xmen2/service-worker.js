/* Rendered by the consumer's packager. Only explicitly listed redistributable
 * application resources are cached. Player files remain exclusively in OPFS. */
const RELEASE = {"version": "b13691e44528ca23da1cfc1c85ba396399c43ac4dcfc6fb27017a6e4a51fd79c", "files": ["app.mjs", "canvas.mjs", "icon-192.png", "icon-512.png", "index.html", "isolation.mjs", "manifest.webmanifest", "storage.mjs", "style.css", "x2native.data", "x2native.js", "x2native.wasm"], "hashes": {"app.mjs": "0cda5ce5494a5f05088ceb4cea2957d20048870c7b5f1d372c593ee88b9cfb39", "canvas.mjs": "fc58ed7583121766ba2ae7538ce2e73bf6a04cf779e0b9a0f73523e6526dc418", "icon-192.png": "03a2a160d86d4a33deea9b3c0b9b482a806c593c2856c6e63ddc0dd81bc27188", "icon-512.png": "c6b7f9e37b2940601fec2aa3d44a79bec48ee266512be8eb8d710cbfa6082ba2", "index.html": "a0505cea82b01624130b8126bd57c05902ef26535b5396a5d5ffc9dbfeab8041", "isolation.mjs": "2b120a89cb591fe837229a22fd61b55c58e15b9eb846f852f9dfdf7fe955321c", "manifest.webmanifest": "2b2e7194f598fa05d60b2af25a598a6722897fa5af336ac49be213b33ea228e9", "storage.mjs": "39bbd691c06ff417a6fc242e5fa2780eeb37d919b1a9adbe8a6d783d6e887538", "style.css": "8670494c1016d9738172f2c823db10bed769bd1e252f20856996268575b499d1", "x2native.data": "ab09b184d5812236c571fc8448e78b04d915e367b4be258860dbbb29caf7a34f", "x2native.js": "f5fb2d907b6c280ed0da74f4e9cb65361e0727791c244e9eb6caaf2998cbfe5a", "x2native.wasm": "f1b46836d3677fd950162107ba1f7f88365eb9d583ea65f663a1b5d5603f643c"}};
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
  /* A query string names arguments for the page, not a different file. Keeping
   * it in the lookup made "index.html?arg=..." miss the release cache, so that
   * navigation was answered by the network WITHOUT the isolation headers below
   * and the page loaded without cross-origin isolation -- which reads as the
   * browser refusing service workers rather than as this line. */
  const resource = new URL(url.pathname, url.origin);
  if (resource.href === self.registration.scope) resource.pathname += "index.html";
  if (!assets.has(resource.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(resource.href);
    if (!response) throw new Error(`Application resource absent from release cache: ${resource.pathname}`);
    const headers = new Headers(response.headers);
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  })());
});
