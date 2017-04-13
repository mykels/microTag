angular.module('microTag')
	.service('DeviceSettingsService', deviceSettingsService);

function deviceSettingsService(HttpCaller, Navigator, FileUploader, DeviceSettingsConverter) {
	var self = this;

	activate();

	function activate() {
		self.deviceConfigurationConfig = {
			type: 'Device Settings',
			getUrl: '/device/settings',
			saveUrl: '/device/settings',
			uploadUrl: '/device/settings/upload',
			downloadUrl: '/device/settings/download',
			fromServerConverter: DeviceSettingsConverter.fromServer,
			toServerConverter: DeviceSettingsConverter.toServer
		};
	}

	this.get = function () {
		return HttpCaller.get(self.deviceConfigurationConfig);
	};

	this.save = function (deviceSettings) {
		return HttpCaller.save(self.deviceConfigurationConfig, deviceSettings);
	};

	this.upload = function (deviceSettingsFile) {
		return FileUploader.upload({
			type: 'json',
			uploadUrl: self.deviceConfigurationConfig.uploadUrl,
			file: deviceSettingsFile
		});
	};

	this.download = function () {
		Navigator.download(self.deviceConfigurationConfig.downloadUrl);
	};
}
