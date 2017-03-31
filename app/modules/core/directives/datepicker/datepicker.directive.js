angular.module('microTag.core')
	.directive('mtDatepicker', datepickerDirective);

function datepickerDirective() {
	return {
		restrict: 'AE',
		scope: {
			chosenDate: '='
		},
		replace: false,
		templateUrl: 'app/modules/core/views/datepicker/datepicker.html',
		controller: 'DatepickerController'
	};
}
