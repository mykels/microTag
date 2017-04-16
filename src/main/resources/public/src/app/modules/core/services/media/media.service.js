angular.module('microTag')
    .service('MediaService', mediaService);

function mediaService($mdMedia) {
    var self = this;

    this.isXs = function () {
        return $mdMedia('xs');
    };

    this.isNotXs = function () {
        return self.isSm() || self.isSm() || self.isMd() || self.isGt() || self.isLg() || self.isXl();
    };

    this.isSm = function () {
        return $mdMedia('sm');
    };

    this.isMd = function () {
        return $mdMedia('md');
    };

    this.isGt = function () {
        return $mdMedia('gt');
    };

    this.isLg = function () {
        return $mdMedia('lg');
    };

    this.isXl = function () {
        return $mdMedia('xl');
    };

}
