angular.module('microTag')
	.config(routesConfig);

function routesConfig($routeProvider) {
	$routeProvider
		.when('/terminal', {
			templateUrl: 'terminal.html',
			controller: 'TerminalController'
		})
		.when('/settings', {
			templateUrl: 'settings.html',
			controller: 'SettingsController',
			resolve: {
				deviceSettings: function (DeviceSettingsService) {
					return DeviceSettingsService.get();
				}
			}
		})
		.when('/report', {
			templateUrl: 'report.html',
			controller: 'ReportController'
		})
		.when('/logs/', {
			templateUrl: 'logs.html',
			controller: 'LogsController',
			resolve: {
				logFiles: function (LogFileService) {
					return LogFileService.getLogFiles();
				}
			}
		})
		.when('/charts', {
			templateUrl: 'charts.html',
			controller: 'ChartsController',
			resolve: {
				measurementPoints: function (MeasurementService) {
					return MeasurementService.getPoints();
				}
			}
		})
		.when('/measurement', {
			templateUrl: 'measurement.html',
			controller: 'MeasurementController'
		})
		.when('/statistics', {
			templateUrl: 'statistics.html',
			controller: 'StatisticsController'
		})
		.otherwise({
			redirectTo: '/terminal'
		});
}
