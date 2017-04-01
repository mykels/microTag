angular.module('microTag.core')
	.controller('SliderController', sliderController);

function sliderController($scope, ObjectUtils) {
	activate();

	function activate() {
		$scope.sliderMin = ObjectUtils.defaultValue($scope.sliderMin, 0);
		$scope.sliderMax = ObjectUtils.defaultValue($scope.sliderMax, 10);
		$scope.sliderStep = ObjectUtils.defaultValue($scope.sliderStep, 1);
	}
}
