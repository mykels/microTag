angular.module('microTag')
    .service('NavigationMenuService', navigationMenuService);

function navigationMenuService(MenuItemBuilder) {
    var self = this;

    activate();

    function activate() {
        initMenu();
    }

    function initMenu() {
        self.menu = [
            MenuItemBuilder.build('Terminal', 'ti-tablet'),
            MenuItemBuilder.build('Settings', 'ti-settings'),
            MenuItemBuilder.build('Report', 'ti-printer'),
            MenuItemBuilder.build('Logs', 'ti-book'),
            MenuItemBuilder.build('Measurement', 'ti-ruler'),
            MenuItemBuilder.build('Statistics', 'ti-pie-chart')
        ];
    }

    this.getMenu = function () {
        return self.menu;
    };
}
