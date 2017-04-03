angular.module('microTag')
	.service('Navigator', navigatorService);

function navigatorService($location, CollectionUtils) {

	this.navigateTo = function (path, params) {
		var fixedPath = '/' + (path.startsWith('#/') ? path.replace('#/', '') : path);
		fixedPath += CollectionUtils.join(params, '/');
		$location.path(fixedPath);
	}
}
