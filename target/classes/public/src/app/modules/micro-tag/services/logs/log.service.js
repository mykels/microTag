angular.module('microTag')
	.service('LogService', logService);

function logService(CollectionUtils, Navigator, HttpCaller, MailUtils) {
	var self = this;

	activate();

	function activate() {
		self.reportConfig = {
			type: 'logs',
			getUrl: '/logs/',
			downloadUrl: '/logs/download/'
		};
	}

	this.getLogs = function (logFileName) {
		return HttpCaller.get(self.reportConfig, logFileName);
	};

	this.download = function (logFileNames) {
		var encodedLogs = CollectionUtils.join(logFileNames, ",");
		Navigator.download("{0}/{1}".format(self.reportConfig.downloadUrl, encodedLogs));
	};

	this.sendMail = function () {
		MailUtils.sendMail('david.keini@microtag-temed.com', {
			subject: 'Please solve my problem',
			body: 'I have a problem that need to be fixed. The relevant logs are attached'
		});
	}
}
