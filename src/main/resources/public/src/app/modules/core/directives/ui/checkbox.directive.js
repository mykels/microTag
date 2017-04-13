angular.module('microTag.core')
	.directive('mtCheckbox', checkboxDirective);

function checkboxDirective() {
	return {
		restrict: 'AE',
		scope: {
			checked: '=',
			checkboxId: '@'
		},
		templateUrl: 'src/app/modules/core/views/ui/checkbox.html',
		controller: "CheckboxController"
	};
}
