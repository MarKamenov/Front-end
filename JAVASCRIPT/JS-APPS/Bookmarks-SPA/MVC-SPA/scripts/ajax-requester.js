const app = app || {};

app.ajaxRequester = (function () {
	function AjaxRequester() {
		this.get = makeGetRequest;
		this.post = makePostRequest;
		this.put = makePutRequest;
		this.delete = makeDeleteRequest;
	}
	const makeRequest = function (url, method, data, headers) {
		const defer = Q.defer();

		$.ajax({
			url: url,
			method: method,
			contentType: 'application/json',
			data: JSON.stringify(data) || undefined,
			headers: headers,
			success: function (data) {
				defer.resolve(data);
			},
			error: function (error) {
				defer.reject(error);
			}
		})

		return defer.promise;
	}
	const makeGetRequest = function (url, headers) {
		return makeRequest(url, 'GET', null, headers);
	}
	const makePostRequest = function (url, data, headers) {
		return makeRequest(url, 'POST', data, headers);
	}
	const makePutRequest = function (url, data, headers) {
		return makeRequest(url, 'PUT', data, headers);
	}
	const makeDeleteRequest = function (url, headers) {
		return makeRequest(url, 'DELETE', null, headers);
	}
	return {
		get: function () {
			return new AjaxRequester();
		}
	}
})()