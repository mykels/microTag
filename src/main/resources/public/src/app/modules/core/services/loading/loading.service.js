angular.module('microTag.core')
	.service('LoadingService', loadingService);

function loadingService(cfpLoadingBar) {
	var self = this;

	activate();

	function activate() {
		self.loadingIndicator = {
			isLoading: false,
			loadingText: ''
		};
	}

	this.start = function () {
		cfpLoadingBar.start();
		self.loadingIndicator.isLoading = true;
	};

	this.stop = function () {
		cfpLoadingBar.complete();
		self.loadingIndicator.isLoading = false;
	};
}
