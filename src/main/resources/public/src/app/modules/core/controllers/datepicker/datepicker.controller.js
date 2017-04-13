angular.module('microTag.core')
	.controller('DatepickerController', datepickerController);

function datepickerController($scope, ObjectUtils) {
	activate();

	function activate() {
		$scope.datepickerOptions = {
			showWeeks: true,
			maxDate: ObjectUtils.defaultValue($scope.maxDate, new Date())
		};

		$scope.chosenDate['value'] = ObjectUtils.defaultValue($scope.chosenDate.value, new Date());
		$scope.isOpened = false;
	}

	$scope.toggleOpened = function () {
		$scope.isOpened = !$scope.isOpened;
	}
}
