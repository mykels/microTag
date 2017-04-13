angular.module('microTag')
	.service('LogService', logService);

function logService(CollectionUtils, Navigator, HttpCaller) {
	var self = this;

	activate();

	function activate() {
		self.logFilesConfig = {
			type: 'logs',
			getUrl: '/logs/',
			downloadUrl: '/logs/download/'
		};
	}

	this.getLogs = function (logFileName) {
		return HttpCaller.get(self.logFilesConfig, logFileName);
	};

	this.download = function (logFileNames) {
		var encodedLogs = CollectionUtils.join(logFileNames, ",");
		Navigator.download("{0}/{1}".format(self.logFilesConfig.downloadUrl, encodedLogs));
	};
}
