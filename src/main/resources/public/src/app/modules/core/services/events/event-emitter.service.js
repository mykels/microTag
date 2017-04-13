angular.module('microTag.core')
	.service('EventEmitter', eventEmitterService);

function eventEmitterService($rootScope) {
	var self = this;

	activate();

	function activate() {
		self.eventPrefix = 'micro-tag-event:';
	}

	this.publish = function (event, data) {
		$rootScope.$broadcast(self.eventPrefix + event, data);
	};

	this.subscribe = function (event, callback) {
		$rootScope.$on(self.eventPrefix + event, callback);
	};
}
