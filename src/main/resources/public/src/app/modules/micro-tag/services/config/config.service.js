angular.module('microTag')
    .service('ConfigService', configService);

function configService(HttpCaller) {
    var self = this;

    activate();

    function activate() {
        self.configConfig = {
            type: 'config',
            getUrl: '/config.lua/config'
        };
    }

    this.get = function () {
        return HttpCaller.get(self.configConfig);
    };
}
