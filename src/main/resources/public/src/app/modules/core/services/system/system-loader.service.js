angular.module('microTag.core')
	.service('SystemLoader', systemLoaderService);

function systemLoaderService($location, System) {
	this.load = load;

	function load() {
		initBaseUrl();
		initYear();
	}

	function initBaseUrl() {
		var protocol = System.useDefault ? System.defaultProtocol : $location.protocol();
		var host = System.useDefault ? System.defaultHost : $location.host();
		var port = System.useDefault ? System.defaultPort : $location.port();

		System.baseUrl = '{0}://{1}:{2}'.format(protocol, host, port);
	}

	function initYear() {
		System.year = new Date().getFullYear();
	}
}
