const version = "v1::" //Change if you want to regenerate cache
const staticCacheName = `${version}static-resources`;

self.addEventListener('install', (event) => {
	console.log('WORKER:: in install.')
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches
		.keys()
		.then((keys) => {
			return Promise.all(
				keys
				.filter((key) => {
					//If your cache name don't start with the current version...
					return !key.startsWith(version);
				})
				.map((key) => {
					//...YOU WILL BE DELETED
					return caches.delete(key);
				})
			);
		})
		.then(() => {
			console.log('WORKER:: activation completed.');
		})
	)
});

self.addEventListener('fetch', function (event) {
	console.log(event);
	event.respondWith(
		// Try the cache
		caches.match(event.request).then(function (response) {
			if (response) {
				return response
			}
			const requestClone = event.request.clone();
			return fetch(requestClone).then((response) => {
				if (!response || response.status !== 200) {
					return response
				}

				const responseClone = response.clone();
				caches
					.open(staticCacheName)
					.then((cache) => {
						cache.put(event.request, responseClone);
					})
				return response
			});
		}).catch(function () {
			//Error stuff
		})
	);
});
