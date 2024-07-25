self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('events.mapbox.com')) {
    event.respondWith(new Response(null, { status: 200 }));
  } else {
    event.respondWith(fetch(event.request));
  }
});
