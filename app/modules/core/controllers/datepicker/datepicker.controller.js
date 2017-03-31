angular.module('microTag.core')
	.controller('DatepickerController', datepickerController);

function datepickerController($scope, ObjectUtils) {
	activate();

	function activate() {
		$scope.datepickerOptions = {
			showWeeks: true
		};

		$scope.chosenDate.value = ObjectUtils.defaultValue($scope.chosenDate.value, new Date());
		$scope.isOpened = false;
	}

	$scope.toggleOpened = function () {
		$scope.isOpened = !$scope.isOpened;
	}
}
