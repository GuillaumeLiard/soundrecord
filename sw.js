importScripts('/soundrecord/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/soundrecord/_nuxt/03cfc5448eea8b97aa24.js",
    "revision": "ab2e27af4f45c8c598f542394dfb64cd"
  },
  {
    "url": "/soundrecord/_nuxt/109038c157fc6bd6b076.js",
    "revision": "4da10fa5974d89ba42646cb943ef8a61"
  },
  {
    "url": "/soundrecord/_nuxt/1a0928aa1aa831ede716.js",
    "revision": "a87ab169c1648e3b77a3212bdf58d899"
  },
  {
    "url": "/soundrecord/_nuxt/376a6a89449c67d38f44.js",
    "revision": "2274226ad899e103933aca80f3ab5713"
  },
  {
    "url": "/soundrecord/_nuxt/4c319bcf507cfd6f17c8.js",
    "revision": "fe8aabe38d08cba12ad3c99c96f07ed0"
  },
  {
    "url": "/soundrecord/_nuxt/68316744763c8dc0572e.js",
    "revision": "79cce6bcd73000b0634c64f324d32caf"
  },
  {
    "url": "/soundrecord/_nuxt/8db1c0738fa217734fcb.js",
    "revision": "680789c3c0af02bb9445e52f248abb30"
  },
  {
    "url": "/soundrecord/_nuxt/8e8d701888c47afe0b9c.js",
    "revision": "af7b86f05398a21f5c4a9955f072650b"
  },
  {
    "url": "/soundrecord/_nuxt/b3c67e91d05d3797e5c1.js",
    "revision": "c140a8388b3d6a70d7fdadeb6ecc2bf6"
  },
  {
    "url": "/soundrecord/_nuxt/d3b0db892ca6e8bfb8c6.js",
    "revision": "deeffa28d13e4276b797efbb0031ab64"
  },
  {
    "url": "/soundrecord/_nuxt/f5775eda8409e2d41b1e.js",
    "revision": "c45a4456ebb69b46aafea609a08a9b2e"
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
