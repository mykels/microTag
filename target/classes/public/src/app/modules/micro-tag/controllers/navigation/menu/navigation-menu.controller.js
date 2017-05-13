angular.module('microTag')
    .controller('NavigationMenuController', sideNavbarController);

function sideNavbarController($scope, NavigationMenuService) {
    activate();

    function activate() {
        $scope.navSearch = {value: ''};
        $scope.menuItems = NavigationMenuService.getMenu();
    }
}
