angular.module('microTag')
    .service('SidenavService', sidenavService);

function sidenavService($timeout, $mdSidenav, $mdMedia, EventEmitter, DocumentUtils) {
    var self = this;

    activate();

    function activate() {
        self.sidenavId = "microTagSidenav";
        self.sidenav = {opened: false};

        registerEventListeners();
    }

    function registerEventListeners() {
        EventEmitter.subscribe('widgetBarCollapsed', handleWidgetBarCollapsed);
    }

    function handleWidgetBarCollapsed() {
        self.close();
    }

    this.toggle = function () {
        $timeout(function () {
            if (self.sidenav.opened) {
                self.close();
            } else {
                self.open();
            }
        });
    };

    this.close = function () {
        $timeout(function () {
            EventEmitter.publish('sidenavIsClosing');

            DocumentUtils.toTheTop();

            getSidenav().close().then(function () {
                EventEmitter.publish('sidenavClosed');
                self.sidenav.opened = false;
            });
        });
    };

    this.open = function () {
        $timeout(function () {
            EventEmitter.publish('sidenavIsOpening');

            getSidenav().open().then(function () {
                EventEmitter.publish('sidenavOpened');

                self.sidenav.opened = true;
            });
        });
    };

    this.isShown = function () {
        return getSidenav().isOpen();
    };

    this.isOpened = function () {
        return !$mdMedia('gt-md') && self.isShown();
    };

    function getSidenav() {
        return $mdSidenav(self.sidenavId);
    }

}
