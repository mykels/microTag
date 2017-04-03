angular.module('microTag')
	.service('LogService', logService);

function logService($q, $timeout, LoadingService, ToastService, CollectionUtils, FileDownloader) {
	var self = this;

	activate();

	function activate() {
		self.logs = generateLogFiles();
	}

	// TODO: download real log files
	this.getLogFiles = function () {
		LoadingService.start();

		var deferred = $q.defer();
		$timeout(function() {
			LoadingService.stop();

			deferred.resolve(self.logs);
		}, 500);

		return deferred.promise;
	};

	// TODO: download real log files
	this.getLogs = function (logFileName) {
		LoadingService.start();

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				if (logFileName === '25Mar17_12_02_311.sLog') {
					resolve([]);
				} else {
					resolve(generateLogs(logFileName));
				}
			}, 1500);
		});
	};

	function generateLogs(logFileName) {
		var logLines = [];

		for (var i = 0; i <= 10000; i++) {
			var level = generateLogLevel();
			var logLine = {
				index: i + 1,
				level: level,
				value: '{0} This is log line #{1} for {2} and it should be treated accordingly'
					.format(level, i + 1, logFileName)
			};

			logLines.push(logLine);
		}

		return logLines;
	}

	function generateLogLevel() {
		var random = Math.floor(Math.random() * 100);
		if (random % 2 === 0) {
			return 'DEBUG';
		}

		return 'NORMAL';
	}

	// TODO: download real log files
	this.download = function (logFile) {
		return FileDownloader.download({
			executionLog: 'Downloading log...',
			httpHandlerUrl: '',
			loadingIndicator: {},
			entityConfig: {},
			logTitle: 'Log',
			expectedErrorLog: 'Could not download your log.',
			unexpectedErrorLog: 'Something went wrong while downloading the log file :(',
			successLog: 'Log downloaded!'
		});
	};

	// TODO: download real log files
	this.delete = function (logFile) {
		LoadingService.start();

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				self.logs = CollectionUtils.removeByProperty(self.logs, "name", logFile.name);
				ToastService.showSuccess(logFile.name + " is deleted!", 'Log Deletion');
				console.log("log file is deleted!", logFile);
				resolve('log file is deleted');
			}, 1000);
		});
	};

	function generateLogFiles() {
		return [
			{
				name: '23Mar17_16_23_213.sLog',
				date: new Date()
			},
			{
				name: '25Mar17_12_02_311.sLog',
				date: new Date()
			},
			{
				name: '27Mar17_14_52_413.sLog',
				date: new Date()
			}
		];
	}
}
