// Service Worker
// self.addEventListener('install', function(event) {
//   console.log(`install event triggered!`);
// });
const CACHE_NAME = 'restaurant-assets';

const URLS_TO_CACHE = Array.from(
  { length: 9 },
  (_, i) => `/img/${i + 1}_large.jpg`
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('reponse within cache: ');
        console.log(event.request.url);
        console.log(response);
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});
