angular.module('microTag')
	.controller('DeviceConfigurationFormController', deviceConfigurationFormController);

function deviceConfigurationFormController($scope, DeviceConfigurationService, LogLevels, ObjectUtils) {
	activate();

	function activate() {
		initDeviceConfiguration();
		backupConfig();

		$scope.logLevels = LogLevels.values;
	}

	// TODO: init with real config
	function initDeviceConfiguration() {
		$scope.deviceConfig = {
			wifiApName: 'michaWifi',
			wifiApPassword: 'michaWifi',
			mdDnsName: 'localhost.micha.home',
			secureServer: 'localhost:55996',
			volume: 5,
			lcdBrightness: 7,
			logLevel: LogLevels.default
		};
	}

	function backupConfig() {
		$scope.backupDeviceConfig = ObjectUtils.clone($scope.deviceConfig);
	}

	$scope.handleSave = function () {
		DeviceConfigurationService.save().then(function () {
			backupConfig();
		});
	};

	$scope.handleReset = function () {
		console.log("reset!");
		ObjectUtils.copyInto($scope.backupDeviceConfig, $scope.deviceConfig);
	};

	$scope.hasConfigurationChanged = function () {
		return !ObjectUtils.deepCompare($scope.deviceConfig, $scope.backupDeviceConfig);
	}
}
