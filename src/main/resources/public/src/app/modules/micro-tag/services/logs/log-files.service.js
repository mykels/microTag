angular.module('microTag')
	.service('LogFileService', logFilesService);

function logFilesService(HttpCaller, LogFileConverter) {
	var self = this;

	activate();

	function activate() {
		self.logFilesConfig = {
			type: 'logFiles',
			getUrl: '/log/files',
			deleteUrl: '/log/files/',
			fromServerConverter: LogFileConverter.fromServer
		};
	}

	this.getLogFiles = function () {
		return HttpCaller.get(self.logFilesConfig);
	};

	this.delete = function (logFileName) {
		return HttpCaller.delete(self.logFilesConfig, logFileName);
	};
}
