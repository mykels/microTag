angular.module('microTag.core')
	.directive('mtSlider', sliderDirective);

function sliderDirective() {
	return {
		restrict: 'AE',
		scope: {
			sliderModel: '=',
			sliderMin: '@',
			sliderMax: '@',
			sliderStep: '@'
		},
		templateUrl: 'slider.html',
		controller: 'SliderController'
	};
}
