angular.module('microTag.core')
	.directive('mtFormHeader', formHeaderDirective);

function formHeaderDirective() {
	return {
		restrict: 'AE',
		scope: {
			saveEnabled: '=',
			resetEnabled: '=',
			loadingIndicator: '=',
			headerTitle: '@',
			saveCallback: '&',
			resetCallback: '&'
		},
		replace: false,
		templateUrl: 'form-header.html',
		controller: 'FormHeaderController'
	};
}
