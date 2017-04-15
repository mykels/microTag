angular.module('microTag')
	.service('Navigator', navigatorService);

function navigatorService($rootScope, $window, $location, CollectionUtils, DocumentUtils, ObjectUtils, System) {
	activate();

	function activate() {
		registerNavigationListeners();
	}

	function registerNavigationListeners() {
		$rootScope.$on("$routeChangeSuccess", function (event, next, current) {
			DocumentUtils.toTheTop();
		});
	}

	this.navigateTo = function (path, params) {
		var fixedPath = '/' + (path.startsWith('#/') ? path.replace('#/', '') : path);
		fixedPath += '/' + CollectionUtils.join(params, '/');
		$location.path(fixedPath);
	};

	this.download = function (path, name) {
		name = ObjectUtils.defaultValue(name, "_blank");

		$window.open(System.baseUrl + (path.startsWith('/') ? "" : '/') + path, name);
	};
}
