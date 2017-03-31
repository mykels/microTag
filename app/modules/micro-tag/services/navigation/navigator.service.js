angular.module('microTag')
	.service('Navigator', navigatorService);

function navigatorService($location) {
	this.navigateTo = function (link) {
		$location.path('/' + link);
	}
}
