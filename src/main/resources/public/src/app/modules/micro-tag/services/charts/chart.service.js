angular.module('microTag')
	.service('ChartService', logService);

function logService($q, $timeout, LoadingService) {
	var self = this;

	activate();

	function activate() {
	}

	// TODO: get real log files
	this.getLogs = function () {
		LoadingService.start();

		return $q(function (resolve, reject) {
			$timeout(function () {
				LoadingService.stop();
				resolve(generateSinus());
			}, 30);
		});
	};

	function generateSinus() {
		var sin = [];

		for (var i = 0; i < 200; i++) {
			sin.push({x: i, y: Math.sin(i / 10)});
		}

		return sin;
	}
}
