/* Rendered by the consumer's packager. Only explicitly listed redistributable
 * application resources are cached. Player files remain exclusively in OPFS. */
const RELEASE = {"version": "9321d8299a728b0d53ff2e16b54012b70353744991cfbbc29bc8b3092607609a", "files": ["app.mjs", "canvas.mjs", "icon-192.png", "icon-512.png", "index.html", "isolation.mjs", "manifest.webmanifest", "storage.mjs", "style.css", "x2native.data", "x2native.js", "x2native.wasm"], "hashes": {"app.mjs": "cb7926a8980e2ebad678c6a3c7486f8021884cbcb417bbd7c7596552092b9a30", "canvas.mjs": "fc58ed7583121766ba2ae7538ce2e73bf6a04cf779e0b9a0f73523e6526dc418", "icon-192.png": "03a2a160d86d4a33deea9b3c0b9b482a806c593c2856c6e63ddc0dd81bc27188", "icon-512.png": "c6b7f9e37b2940601fec2aa3d44a79bec48ee266512be8eb8d710cbfa6082ba2", "index.html": "a0505cea82b01624130b8126bd57c05902ef26535b5396a5d5ffc9dbfeab8041", "isolation.mjs": "2b120a89cb591fe837229a22fd61b55c58e15b9eb846f852f9dfdf7fe955321c", "manifest.webmanifest": "2b2e7194f598fa05d60b2af25a598a6722897fa5af336ac49be213b33ea228e9", "storage.mjs": "39bbd691c06ff417a6fc242e5fa2780eeb37d919b1a9adbe8a6d783d6e887538", "style.css": "8670494c1016d9738172f2c823db10bed769bd1e252f20856996268575b499d1", "x2native.data": "8d6286d51baaca22d70082f6292f454fc79ece3b9d68ab9e32b2287c84dac734", "x2native.js": "04d6c929270bb436c71f151b7841f79702bb97efa77406eec1116d68b3eac51d", "x2native.wasm": "a880e60e2389454a16df0c4719d66c5c7dffc4bafe87d5ef8b657b2f1d1d303f"}};
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
