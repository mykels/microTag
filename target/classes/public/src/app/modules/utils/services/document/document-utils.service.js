angular.module('microTag.utils')
	.service('DocumentUtils', documentUtilsService);

function documentUtilsService($document, $route) {
	this.toTheTop = function () {
		$document.scrollTopAnimated(0, 600);
	};

	this.reload = function () {
		return $route.reload();
	};
}
