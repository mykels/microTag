angular.module('microTag.core')
	.directive('mtFormHeader', formHeaderDirective);

function formHeaderDirective() {
	return {
		restrict: 'AE',
		scope: {
			saveEnabled: '=',
			resetEnabled: '=',
			loadingIndicator: '=',
			saveCallback: '&',
			resetCallback: '&'
		},
		replace: false,
		templateUrl: 'app/modules/core/views/form/form-header.html',
		controller: 'FormHeaderController'
	};
}
