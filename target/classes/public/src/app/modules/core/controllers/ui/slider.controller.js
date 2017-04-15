angular.module('microTag.core')
	.controller('SliderController', sliderController);

function sliderController($scope, ObjectUtils) {
	activate();

	function activate() {
		$scope.slider = {
			options: {
				floor: ObjectUtils.defaultValue($scope.sliderMin, 0),
				ceil: ObjectUtils.defaultValue($scope.sliderMax, 10),
				step: ObjectUtils.defaultValue($scope.sliderStep, 1),
				showSelectionBar: true,
				selectionBarGradient: {
					from: 'white',
					to: '#3d96ff'
				}
			}
		};
	}
}
