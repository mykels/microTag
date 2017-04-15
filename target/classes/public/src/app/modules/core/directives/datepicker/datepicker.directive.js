angular.module('microTag.core')
	.directive('mtDatepicker', datepickerDirective);

function datepickerDirective() {
	return {
		restrict: 'AE',
		scope: {
			chosenDate: '=',
			options: '=?',
			disabled: '=?'
		},
		replace: false,
		templateUrl: 'src/app/modules/core/views/datepicker/datepicker.html',
		controller: 'DatepickerController'
	};
}
