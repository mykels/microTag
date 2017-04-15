angular.module('microTag.utils')
	.service('ImageUtils', imageService);

function imageService(System) {
	var self = this;

	activate();

	function activate() {
		self.imageUrl = "/image/";
	}

	this.constructUrl = function (imageName) {
		return System.baseUrl + self.imageUrl + imageName;
	}
}
