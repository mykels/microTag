angular.module('microTag.core')
	.controller('SettingsController', settingsController);

function settingsController($scope) {
	activate();

	function activate() {
		$scope.volume = {value: 10};
	}
}
