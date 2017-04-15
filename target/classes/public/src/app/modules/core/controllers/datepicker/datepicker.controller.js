angular.module('microTag.core')
	.controller('DatepickerController', datepickerController);

function datepickerController($scope, ObjectUtils) {
	activate();

	function activate() {
		initOptions();

		$scope.chosenDate['value'] = ObjectUtils.defaultValue($scope.chosenDate.value, new Date());
		$scope.isOpened = false;
	}

	function initOptions() {
		$scope.datepickerOptions = ObjectUtils.defaultValue($scope.options, {});
		$scope.datepickerOptions.showWeeks = true;
		$scope.datepickerOptions.maxDate = ObjectUtils.defaultValue($scope.datepickerOptions.maxDate, new Date());
	}

	$scope.toggleOpened = function () {
		$scope.isOpened = !$scope.isOpened;
	};
}
