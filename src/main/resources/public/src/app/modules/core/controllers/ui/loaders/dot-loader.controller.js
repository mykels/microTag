angular.module('microTag.core')
	.controller('DotLoaderController', dotLoaderController);

function dotLoaderController($scope, $interval) {
	activate();

	function activate() {
		initDots();
		initDotAccumulator();

		function initDots() {
			$scope.loadingText = ".";
			$scope.dotCount = 1;
		}

		function initDotAccumulator() {
			$interval(function () {
				if ($scope.dotCount++ % 4 === 0) {
					initDots();
				} else {
					$scope.loadingText += ".";
				}
			}, 200);
		}
	}
}
