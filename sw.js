'use strict';

const CACHE_NAME = 'dna-song-ai-shell-v1';
const PRECACHE_URLS = [
  './index.html',
  './studio.css',
  './language.js',
  './genres.js',
  './brief-options.js',
  './audio.js',
  './studio.js',
  './workspace.js',
  './pwa.js',
  './manifest.webmanifest',
  './icons/app-icon.svg',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
const SHELL_PATHS = new Set(
  PRECACHE_URLS.map(path => new URL(path, self.registration.scope).pathname)
);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.addAll(PRECACHE_URLS);
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter(name => name.startsWith('dna-song-ai-shell-') && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate';
  if (!isNavigation && !SHELL_PATHS.has(url.pathname)) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        const cacheKey = isNavigation
          ? new URL('./index.html', self.registration.scope).href
          : request;
        try {
          await cache.put(cacheKey, response.clone());
        } catch (error) {
          console.error('Could not update the offline app cache.', error);
        }
      }
      return response;
    } catch (error) {
      const cacheKey = isNavigation
        ? new URL('./index.html', self.registration.scope).href
        : request;
      const cachedResponse = await caches.match(cacheKey, { ignoreSearch: true });
      if (cachedResponse) return cachedResponse;
      throw error;
    }
  })());
});
