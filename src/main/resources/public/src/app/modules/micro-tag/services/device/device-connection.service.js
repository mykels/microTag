angular.module('microTag')
	.service('DeviceConnectionService', deviceConnectionService);

function deviceConnectionService($timeout, $q, $interval, LoadingService) {
	var self = this;

	activate();

	function activate() {
		initStatus();
		initStatusChecker();
	}

	function initStatus() {
		self.status = {connected: false};
	}

	function initStatusChecker() {
		self.statusChecker = $interval(function () {
			self.getStatus().then(function (isConnected) {
				self.status.connected = isConnected;
			});
		}, 5000);
	}

	this.getStatus = function () {
		var deferred = $q.defer();
		$timeout(function () {
			deferred.resolve((Math.floor(Math.random() * 1000 % 2)) === 0);
		}, 50);

		return deferred.promise;
	};

	this.reconnect = function () {
		self.status.connected = false;
		$interval.cancel(self.statusChecker);

		this.connect().then(function () {
			self.status.connected = true;
			initStatusChecker();
		});
	};

	this.connect = function () {
		var deferred = $q.defer();
		LoadingService.start();

		$timeout(function () {
			LoadingService.stop();
			deferred.resolve(true);
		}, 5000);

		return deferred.promise;
	}

}
