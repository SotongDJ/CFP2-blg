// reference:
// - https://github.com/mdn/sw-test
// - https://developer.chrome.com/docs/workbox/caching-strategies-overview/
//
const currentVersion = 'v1.3';

const addResourcesToCache = async (resources) => {
const cache = await caches.open(currentVersion);
await cache.addAll(resources);
};

const putInCache = async (request, response) => {
const cache = await caches.open("v1");
await cache.put(request, response);
};
  
const enableNavigationPreload = async () => {
if (self.registration.navigationPreload) {
await self.registration.navigationPreload.enable();
};
};

const deleteCache = async (key) => {await caches.delete(key);};

const deleteOldCaches = async () => {
const cacheKeepList = [currentVersion];
const keyList = await caches.keys();
const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
await Promise.all(cachesToDelete.map(deleteCache));
};

const responseHandle = async (event) => {
const cachedResponse = await caches.open(currentVersion).then(async (cache) => {cache.match(event.request)});
const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
await putInCache(event.request, networkResponse.clone());
return networkResponse;
});
const preloadResponse = await event.preloadResponse;
return cachedResponse || (fetchedResponse || preloadResponse);
}

precache_arr = [
'/','/font.css','/icon.css','/index.html',
'/main.css','/main.js','/main.webmanifest',
'/playlist.js','/register.js',
];

self.addEventListener('activate', (event) => {
event.waitUntil(enableNavigationPreload());
event.waitUntil(deleteOldCaches());
});

self.addEventListener('install', (event) => {event.waitUntil(addResourcesToCache(precache_arr));});

self.addEventListener('fetch', async (event) => {
if (event.request.url.match('^.*(\.mp3)$')) {return false;};
if (event.request.url.match('^.*(www\.buzzsprout\.com)*.$')) {return false;};
await event.respondWith(responseHandle(event));
});
