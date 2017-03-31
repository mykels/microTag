angular.module('microTag')
	.service('DeviceConfigurationService', deviceConfigurationService);

// TODO: communicate with real service
function deviceConfigurationService($q, $timeout, ToastService, LoadingService) {
	this.save = function () {
		LoadingService.start();

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				ToastService.showSuccess('Configuration saved successfully!', 'Device Configuration');
				resolve('Hello, ' + name + '!');
			}, 3000);
		});
	}
}
