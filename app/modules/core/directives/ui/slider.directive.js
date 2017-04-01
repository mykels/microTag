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
		templateUrl: 'app/modules/core/views/ui/slider.html',
		controller: 'SliderController'
	};
}
