angular.module('microTag.utils')
	.service('DocumentUtils', documentUtilsService);

function documentUtilsService($document) {
	this.toTheTop = function () {
		$document.scrollTopAnimated(0, 600);
	};
}
