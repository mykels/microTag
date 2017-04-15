angular.module('microTag')
	.service('MediaService', mediaService);

function mediaService($mdMedia) {

	this.isXs = function(){
		return $mdMedia('xs');
	};

	this.isSm = function(){
		return $mdMedia('sm');
	};

	this.isMd = function(){
		return $mdMedia('md');
	};

	this.isLg = function(){
		return $mdMedia('lg');
	};

	this.isXl = function(){
		return $mdMedia('xl');
	};

}
