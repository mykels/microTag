angular.module('microTag')
	.service('ReportService', reportService);

function reportService(HttpCaller, DateUtils) {
	var self = this;

	activate();

	function activate() {
		self.reportConfig = {
			type: 'Report',
			getUrl: '/report/',
			successLog: "Report is fetched successfully",
			unexpectedErrorLog: 'Could not get report'
		};
	}

	this.getReport = function (startDate, endDate) {
		var backupGetUrl = self.reportConfig.getUrl;
		self.reportConfig.getUrl += DateUtils.stringify(startDate, undefined, '_') +
			'/' + DateUtils.stringify(endDate, undefined, '_');

		return HttpCaller.get(self.reportConfig).then(function (response) {
			self.reportConfig.getUrl = backupGetUrl;
			return response;
		});
	};
}
