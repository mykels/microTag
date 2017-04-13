angular.module('microTag')
	.controller('SettingsController', settingsController);

function settingsController($scope, deviceSettings) {
	activate();

	function activate() {
		$scope.deviceSettings = deviceSettings;
	}
}
