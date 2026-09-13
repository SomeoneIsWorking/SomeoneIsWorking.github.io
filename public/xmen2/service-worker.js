/* Rendered by the consumer's packager. Only explicitly listed redistributable
 * application resources are cached. Player files remain exclusively in OPFS. */
const RELEASE = {"version": "d1c06170003ad2f38cb320b5fcbc0b73b7b43b6b9eb5ee106a71330c8f00d53a", "files": ["app.mjs", "icon-192.png", "icon-512.png", "index.html", "isolation.mjs", "manifest.webmanifest", "storage.mjs", "style.css", "x2native.data", "x2native.js", "x2native.wasm"], "hashes": {"app.mjs": "e1163fe052634411af551df65256be9aecfbd86dded7c4009e125593e1a28500", "icon-192.png": "03a2a160d86d4a33deea9b3c0b9b482a806c593c2856c6e63ddc0dd81bc27188", "icon-512.png": "c6b7f9e37b2940601fec2aa3d44a79bec48ee266512be8eb8d710cbfa6082ba2", "index.html": "a0505cea82b01624130b8126bd57c05902ef26535b5396a5d5ffc9dbfeab8041", "isolation.mjs": "c27cc11bd31f573ad7f71c0a844c2b6a501dc3eee5a187740291c4e34339e367", "manifest.webmanifest": "2b2e7194f598fa05d60b2af25a598a6722897fa5af336ac49be213b33ea228e9", "storage.mjs": "4bd0ffab16bd2255d3fd0505d8d9c96d163c214d1992d7c7d13522cfa397f7f5", "style.css": "b351f1cdbfe45cb28cd670257f69a937f8f315b7c4a6a9d0d746d67ca208eade", "x2native.data": "ab09b184d5812236c571fc8448e78b04d915e367b4be258860dbbb29caf7a34f", "x2native.js": "d517debf206c2b09d770cfcd33d110b0aaae0fa7fd8d8f2969aedc11067d4c56", "x2native.wasm": "d3f98469ce6a7fb85b1cbc946201af49c1b9a3a0faa9a630f6d62e9a724f9d90"}};
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
