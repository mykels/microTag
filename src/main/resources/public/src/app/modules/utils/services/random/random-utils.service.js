angular.module('microTag.utils')
    .service('RandomUtils', randomUtilsService);

function randomUtilsService() {
    var self = this;

    activate();

    function activate() {
    }

    this.guid = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
