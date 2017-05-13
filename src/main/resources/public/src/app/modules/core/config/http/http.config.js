angular.module('microTag.core')
	.config(httpConfigurator);

function httpConfigurator($httpProvider) {
	activate();

	function activate() {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
	}
}


