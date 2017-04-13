angular.module('microTag.core')
	.service('HttpHandler', httpHandlerService);

function httpHandlerService($q, $http, System, SystemLoader, StringUtils) {
	var self = this;

	activate();

	function activate() {
		SystemLoader.load();
	}

	this.get = function (relativeUrl, config) {
		return $http.get(System.baseUrl + relativeUrl, config);
	};

	this.getAndResolve = function (relativeUrl, config) {
		var deferred = $q.defer();
		self.get(relativeUrl, config).then(function (response) {
			deferred.resolve(angular.isDefined(response) && angular.isDefined(response.data) ? response.data : response);
		}, function (status) {
			deferred.reject(status);
		});

		return deferred.promise;
	};

	this.head = function (relativeUrl, config) {
		return $http.head(System.baseUrl + relativeUrl, config);
	};

	this.post = function (relativeUrl, data, config) {
		return $http.post(System.baseUrl + relativeUrl, data, config);
	};

	this.put = function (relativeUrl, data, config) {
		return $http.put(System.baseUrl + relativeUrl, data, config);
	};

	this.delete = function (relativeUrl, config) {
		return $http.delete(System.baseUrl + relativeUrl, config);
	};

	this.jsonp = function (relativeUrl, config) {
		return $http.jsonp(System.baseUrl + relativeUrl, config);
	};

	this.patch = function (relativeUrl, data, config) {
		return $http.patch(System.baseUrl + relativeUrl, data, config);
	};

	this.options = function (relativeUrl, data) {
		return $http({
			method: 'OPTIONS',
			url: System.baseUrl + relativeUrl,
			responseType: 'json',
			data: data
		});
	};

	this.for = function (httpMethod) {
		return self[httpMethod.toString().toLowerCase()];
	};

	this.isGet = function (httpMethod) {
		return StringUtils.compareToIgnoreCase(httpMethod, 'GET');
	};

	this.isPost = function (httpMethod) {
		return StringUtils.compareToIgnoreCase(httpMethod, 'POST');
	};
}
