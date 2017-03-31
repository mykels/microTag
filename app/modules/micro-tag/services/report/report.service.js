angular.module('microTag')
	.service('ReportService', reportService);

function reportService($q, $timeout, ToastService, LoadingService) {
	// TODO: download real report
	this.download = function () {
		LoadingService.start();

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				ToastService.showSuccess('Report downloaded successfully!', 'Report Download');
				resolve('Hello, ' + name + '!');
			}, 3000);
		});
	};

	// TODO: get real report
	this.getReport = function (startDate, endDate) {
		LoadingService.start();

		var reportRecords = [
			{
				date: startDate,
				result: 'HIGH EMI',
				amp: '0.1232',
				snr: '4.234',
				tagId: '1123ASds',
				swId: 'G3.5-4-dev',
				hwId: 'ABBA007',
				serial: '#6192353Asd2',
				eSignature: '4CD24EAE1FA9208D38FBAA881BE1EFAA741E22C7BBE2B62107D6099227EDA9E6'
			}, {
				date: startDate,
				result: 'HIGH EMI',
				amp: '0.2123',
				snr: '4.34543',
				tagId: '1123ASds',
				swId: 'G3.5-4-dev',
				hwId: 'ABBA007',
				serial: '#546456456',
				eSignature: '67867876BFGFDFFBAA881BE1EFAA741E22C7BBE2B62107D6099227EDA9E6'
			}, {
				date: endDate,
				result: 'HIGH EMI',
				amp: '0.1232',
				snr: '4.56',
				tagId: '1123ASds',
				swId: 'G3.5-4-dev',
				hwId: 'ABBA007',
				serial: '#234234234',
				eSignature: '32534254BHADSADEFAA741E22C7BBE2B62107D6099227EDA9E6'
			}
		];

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				ToastService.showSuccess('Report fetched successfully!', 'Report');
				resolve(Math.random() * 100 < 30 ? reportRecords : []);
			}, 1000);
		});

	}
}
