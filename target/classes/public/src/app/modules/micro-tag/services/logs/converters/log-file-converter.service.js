angular.module('microTag')
	.service('LogFileConverter', logFileConverterService);

function logFileConverterService(CollectionUtils) {
	this.fromServer = function (logFiles) {
		if (CollectionUtils.isNotEmpty(logFiles)) {
			logFiles.forEach(convertLogFile);
		}

		return logFiles;
	};

	function convertLogFile(logFile) {
		logFile.date = new Date(logFile.date);
	}
}
