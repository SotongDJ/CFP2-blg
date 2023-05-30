// reference:
// - https://github.com/mdn/sw-test
// - https://web.dev/navigation-preload/
// - https://developer.chrome.com/docs/workbox/caching-strategies-overview/
// - https://jakearchibald.com/2014/offline-cookbook/#stale-while-revalidate

// Set the current version of the service worker
const currentVersion = 'v0.2.1';

// Function to delete a cache with a given key
const deleteCache = async (key) => {
    await caches.delete(key);
};

// Function to delete all caches except the current version
const deleteOldCaches = async () => {
    // List of caches to keep
    const cacheKeepList = [currentVersion];
    // Get a list of all cache keys
    const keyList = await caches.keys();
    // Filter out the caches to delete
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    // Delete the caches
    await Promise.all(cachesToDelete.map(deleteCache));
};

// Event listener for when the service worker is activated
addEventListener('activate', event => {
    event.waitUntil(async function() {
        // Disable navigation preload if it is supported
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.disable();
        }
    }());
    // Delete old caches
    event.waitUntil(deleteOldCaches());
});

// Function to add resources to the cache
const addResourcesToCache = async (resources) => {
    // Open the cache for the current version
    const cache = await caches.open(currentVersion);
    // Add the resources to the cache
    await cache.addAll(resources);
};

// Array of resources to precache
const precache_arr = [
    '/font.css','/icon.css','/index.html',
    '/main.css','/main.js','/main.webmanifest',
    '/register.js'
];

// Event listener for when the service worker is installed
self.addEventListener('install', (event) => {
    // Add the resources to the cache
    event.waitUntil(addResourcesToCache(precache_arr));
});

// Function to handle responses for fetch events
const responseHandle = async (event) => {
    // Try to get a cached response for the request
    const cachedResponse = await caches.open(currentVersion).then(async (cache) => {
        const cachedResp = await cache.match(event.request);
        return cachedResp;
    });
    // If there is no cached response, fetch the request and add it to the cache
    const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
        const cache = await caches.open(currentVersion);
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
    });
    // Return the cached response or the fetched response
    return cachedResponse || fetchedResponse;
}

// Event listener for fetch events
self.addEventListener('fetch', async (event) => {
    // If the request is for an mp3 file, do not respond with the service worker
    // if (event.request.url.match('^.*(\.mp3)$')) {return false;};
    // If the request is for a Buzzsprout URL, fetch it normally
    if (event.request.url.match('^.*(www\.buzzsprout\.com)*.$')) {
        await event.respondWith(fetch(event.request));
    } else {
        // Otherwise, handle the response with the service worker
        await event.respondWith(responseHandle(event));
    };
});
