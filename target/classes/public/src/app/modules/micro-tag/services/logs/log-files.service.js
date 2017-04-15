angular.module('microTag')
	.service('LogFileService', logFilesService);

function logFilesService(HttpCaller, LogFileConverter) {
	var self = this;

	activate();

	function activate() {
		self.reportConfig = {
			type: 'Log Files',
			getUrl: '/log/files',
			deleteUrl: '/log/files/',
			fromServerConverter: LogFileConverter.fromServer,
			logTitle: "Log Files",
			unexpectedErrorLog: 'Could not get log files'
		};
	}

	this.getLogFiles = function () {
		return HttpCaller.get(self.reportConfig);
	};

	this.delete = function (logFileName) {
		return HttpCaller.delete(self.reportConfig, logFileName);
	};
}
