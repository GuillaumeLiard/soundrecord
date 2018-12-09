importScripts('/soundrecord/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/soundrecord/_nuxt/0d964c3c25f956685f15.js",
    "revision": "2edc865ba00de17764744ef612059a43"
  },
  {
    "url": "/soundrecord/_nuxt/1122d22f483671aa8c1d.js",
    "revision": "b3fbb6c9e0cd922c563217b5f9f3206f"
  },
  {
    "url": "/soundrecord/_nuxt/3893f6738e422bb4e90a.js",
    "revision": "7c3c19508885f6905ea98a4827a86b2c"
  },
  {
    "url": "/soundrecord/_nuxt/58601a0f5394a07563bb.js",
    "revision": "8f4a4635a07d2c3e7bc8d83e488d5d7a"
  },
  {
    "url": "/soundrecord/_nuxt/68c434678c146526055a.js",
    "revision": "48c57c1ff4746e9ebcbbfd6b939328fa"
  },
  {
    "url": "/soundrecord/_nuxt/8e9ad99364193ba3b178.js",
    "revision": "05d1f883ec45d0682acb619fd78cf66a"
  },
  {
    "url": "/soundrecord/_nuxt/cea82284394d5cac6642.js",
    "revision": "f2842519d33ce2b136f26edd6bffbffd"
  }
], {
  "cacheId": "soundrecord",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/soundrecord/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/soundrecord/.*'), workbox.strategies.networkFirst({}), 'GET')
