angular.module('microTag')
	.directive('mtResize', resizeDirective);

function resizeDirective($timeout, $window, ObjectUtils) {
	return {
		restrict: 'AE',
		scope: {
			onResize: '&',
			resizeDebounce: '@'
		},
		link: function (scope, element) {
			scope.resizeDebounce = ObjectUtils.defaultValue(scope.resizeDebounce, 100);

			var w = angular.element($window);
			scope.getWindowDimensions = function () {
				return {
					'h': w.height(),
					'w': w.width()
				};
			};

			scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
				$timeout(function () {
					scope.windowHeight = newValue.h;
					scope.windowWidth = newValue.w;

					scope.onResize({
						'height': (newValue.h - 100) + 'px',
						'width': (newValue.w - 100) + 'px'
					});
				}, scope.resizeDebounce);
			}, true);

			w.bind('resize', function () {
				scope.$apply();
			});
		}
	};
}
