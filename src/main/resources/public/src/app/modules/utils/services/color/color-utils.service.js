angular.module('microTag.utils')
    .service('ColorUtils', colorUtilsService);

function colorUtilsService() {
    var self = this;

    this.random = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    };
}
