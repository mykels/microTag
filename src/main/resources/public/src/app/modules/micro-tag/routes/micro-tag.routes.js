angular.module('microTag')
	.config(routesConfig);

function routesConfig($routeProvider) {
	$routeProvider
		.when('/terminal', {
			templateUrl: 'src/app/modules/micro-tag/views/terminal/terminal.html',
			controller: 'TerminalController'
		})
		.when('/settings', {
			templateUrl: 'src/app/modules/micro-tag/views/settings/settings.html',
			controller: 'SettingsController',
			resolve: {
				deviceSettings: function (DeviceSettingsService) {
					return DeviceSettingsService.get();
				}
			}
		})
		.when('/report', {
			templateUrl: 'src/app/modules/micro-tag/views/report/report.html',
			controller: 'ReportController'
		})
		.when('/logs/:logFileName?', {
			templateUrl: 'src/app/modules/micro-tag/views/logs/logs.html',
			controller: 'LogsController',
			resolve: {
				logFiles: function (LogFileService) {
					return LogFileService.getLogFiles();
				}
			}
		})
		.when('/charts', {
			templateUrl: 'src/app/modules/micro-tag/views/charts/charts.html',
			controller: 'ChartsController',
			resolve: {
				chartLogs: function (ChartService) {
					return ChartService.getLogs();
				}
			}
		})
		.when('/measurement', {
			templateUrl: 'src/app/modules/micro-tag/views/measurement/measurement.html',
			controller: 'MeasurementController'
		})
		.when('/statistics', {
			templateUrl: 'src/app/modules/micro-tag/views/statistics/statistics.html',
			controller: 'StatisticsController'
		})
		.when('/charts', {
			templateUrl: 'src/app/modules/micro-tag/views/charts/charts.html',
			controller: 'ChartsController',
			resolve: {
				chartLogs: function (ChartService) {
					return ChartService.getLogs();
				}
			}
		})
		.otherwise({
			redirectTo: '/terminal'
		});
}
