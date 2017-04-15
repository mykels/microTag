angular.module('microTag.core')
	.directive('mtFocusMe', focusMeDirective);

function focusMeDirective($timeout, $parse) {
	return {
		link: function (scope, element, attrs) {
			var model = $parse(attrs.mtFocusMe);

			scope.$watch(model, function (value) {
				if (value === true) {
					$timeout(function () {
						element[0].focus();
					});
				}
			});
		}
	};
}
