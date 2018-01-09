/**
 *
 * @param {string} url
 * @param {Object} init
 * @param {function} dispatch
 * @returns {Promise}
 */
export function fetchFromApi(url, init, dispatch) {
	return new Promise((resolve, reject) => {
		fetch(buildRequest(url, init))
			.then(response => {
				switch (response.status) {
					case 401:
						if (response.url === buildApiUrl('token/')) {
							// Login failed
							resolve(response);
						}
						// Access denied (Token has expired)
						return reject(response);
					case 400:
					case 403:
						return reject(response);
					case 404:
						return reject(response);
					case 409:
					case 500:
						return reject(response);
					default:
						// Ok
						return resolve(response);
				}
			})
			.catch(err => reject(err));
	});
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @returns {Request}
 */
export function buildRequest(url, init) {
	return  new Request(buildApiUrl(url), { ...init, mode: 'cors' });
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
export function buildQueryString(query) {
	const pairs = [];

	query.forEach((value, key) => {
		pairs.push([key, value].join('='));
	});

	return pairs.length ? '?' + pairs.join('&') : '';
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
function buildApiUrl(url) {
	//change the following url to be our environment variables base url
	return ['https://google.com', url].join('/');
}
