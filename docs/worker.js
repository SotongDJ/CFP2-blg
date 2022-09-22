// reference:
// - https://github.com/mdn/sw-test
// - https://web.dev/navigation-preload/
// - https://developer.chrome.com/docs/workbox/caching-strategies-overview/
// - https://jakearchibald.com/2014/offline-cookbook/#stale-while-revalidate
//
const currentVersion = 'v1.5';

const deleteCache = async (key) => {await caches.delete(key);};

const deleteOldCaches = async () => {
const cacheKeepList = [currentVersion];
const keyList = await caches.keys();
const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
await Promise.all(cachesToDelete.map(deleteCache));
};

addEventListener('activate', event => {
event.waitUntil(async function() {
if (self.registration.navigationPreload) {
await self.registration.navigationPreload.disable();
}
}());
event.waitUntil(deleteOldCaches());
});

const addResourcesToCache = async (resources) => {
const cache = await caches.open(currentVersion);
await cache.addAll(resources);
};

const precache_arr = [
'/font.css','/icon.css','/index.html',
'/main.css','/main.js','/main.webmanifest',
'/register.js'
];

self.addEventListener('install', (event) => {
event.waitUntil(addResourcesToCache(precache_arr));
});

const responseHandle = async (event) => {
const cachedResponse = await caches.open(currentVersion).then(async (cache) => {
const cachedResp = await cache.match(event.request);
return cachedResp;
});
const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
const cache = await caches.open(currentVersion);
await cache.put(event.request, networkResponse.clone());
return networkResponse;
});
return cachedResponse || fetchedResponse;
}

self.addEventListener('fetch', async (event) => {
// if (event.request.url.match('^.*(\.mp3)$')) {return false;};
if (event.request.url.match('^.*(www\.buzzsprout\.com)*.$')) {
await event.respondWith(fetch(event.request));
} else {
await event.respondWith(responseHandle(event));
};
});
