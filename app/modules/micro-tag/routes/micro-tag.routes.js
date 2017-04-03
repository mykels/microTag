angular.module('microTag')
	.config(routesConfig);

function routesConfig($routeProvider) {
	$routeProvider
		.when('/terminal', {
			templateUrl: 'app/modules/micro-tag/views/terminal/terminal.html',
			controller: 'TerminalController'
		})
		.when('/settings', {
			templateUrl: 'app/modules/micro-tag/views/settings/settings.html',
			controller: 'SettingsController'
		})
		.when('/report', {
			templateUrl: 'app/modules/micro-tag/views/report/report.html',
			controller: 'ReportController'
		})
		.when('/logs/:logFileName?', {
			templateUrl: 'app/modules/micro-tag/views/logs/logs.html',
			controller: 'LogsController',
			resolve: {
				logFiles: function (LogService) {
					return LogService.getLogFiles();
				}
			}
		})
		.when('/charts', {
			templateUrl: 'app/modules/micro-tag/views/charts/charts.html',
			controller: 'ChartsController'
		})
		.otherwise({
			redirectTo: '/terminal'
		});
}
