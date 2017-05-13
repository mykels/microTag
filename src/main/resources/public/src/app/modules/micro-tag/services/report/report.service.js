angular.module('microTag')
	.service('ReportService', reportService);

function reportService(HttpCaller, DateUtils) {
	var self = this;

	activate();

	function activate() {
		self.configConfig = {
			type: 'Report',
			getUrl: '/report.lua/report/',
			successLog: "Report is fetched successfully",
			unexpectedErrorLog: 'Could not get report'
		};
	}

	this.get = function (startDate, endDate) {
		var backupGetUrl = self.configConfig.getUrl;
		self.configConfig.getUrl += DateUtils.stringify(startDate, undefined, '_') +
			'/' + DateUtils.stringify(endDate, undefined, '_');

		return HttpCaller.get(self.configConfig).then(function (response) {
			self.configConfig.getUrl = backupGetUrl;
			return response;
		});
	};
}
