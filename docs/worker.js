// reference:
// - https://github.com/mdn/sw-test
// - https://developer.chrome.com/docs/workbox/caching-strategies-overview/
//
const currentVersion = 'v1.1';
const addResourcesToCache = async (resources) => {
 const cache = await caches.open(currentVersion);
 await cache.addAll(resources);
};
const enableNavigationPreload = async () => {
 if (self.registration.navigationPreload) {await self.registration.navigationPreload.enable();};
};
const deleteCache = async (key) => {await caches.delete(key);};
const deleteOldCaches = async () => {
 const cacheKeepList = [currentVersion];
 const keyList = await caches.keys();
 const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
 await Promise.all(cachesToDelete.map(deleteCache));
};
precache_arr = [
'/',
'/index.html',
'/main.css',
'/main.js',
'/main.webmanifest',
'/font.css',
'/icon.css',
'/playlist.js',
'/register.js',
];
self.addEventListener('activate', (event) => {
 event.waitUntil(enableNavigationPreload());
 event.waitUntil(deleteOldCaches());
});
self.addEventListener('install', (event) => {event.waitUntil(addResourcesToCache(precache_arr));});
self.addEventListener('fetch', (event) => {
 if (event.request.url.match('^.*(\.mp3)$')) {return false;};
 event.respondWith(
    caches.open(currentVersion).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
        });
        return cachedResponse || fetchedResponse;
    })
 );
});
