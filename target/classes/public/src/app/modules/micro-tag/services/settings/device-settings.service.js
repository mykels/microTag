angular.module('microTag')
	.service('DeviceSettingsService', deviceSettingsService);

function deviceSettingsService(HttpCaller, Navigator, FileUploader, DeviceSettingsConverter) {
	var self = this;

	activate();

	function activate() {
		self.deviceConfigurationConfig = {
			type: 'Device Settings',
			getUrl: '/device.lua/settings',
			saveUrl: '/device.lua/save',
			uploadUrl: '/device.lua/upload',
			downloadUrl: '/device.lua/download',
			fromServerConverter: DeviceSettingsConverter.fromServer,
			toServerConverter: DeviceSettingsConverter.toServer,
			logTitle: "Device Settings",
			unexpectedErrorLog: 'Could not get device settings'
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
			type: self.deviceConfigurationConfig.type,
			uploadUrl: self.deviceConfigurationConfig.uploadUrl,
			file: deviceSettingsFile
		});
	};

	this.download = function () {
		Navigator.download(self.deviceConfigurationConfig.downloadUrl, "device-settings.zip");
	};
}
