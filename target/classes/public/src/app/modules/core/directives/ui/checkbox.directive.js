angular.module('microTag.core')
	.directive('mtCheckbox', checkboxDirective);

function checkboxDirective() {
	return {
		restrict: 'AE',
		scope: {
			checked: '=',
			checkboxId: '@'
		},
		templateUrl: 'checkbox.html',
		controller: "CheckboxController"
	};
}
