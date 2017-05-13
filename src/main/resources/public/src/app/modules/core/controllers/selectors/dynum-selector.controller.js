angular.module('microTag.core')
    .controller('DynumSelectorController', dynumSelectorController);

function dynumSelectorController($scope, Dynum) {
    activate();

    function activate() {
        initOptions();
    }

    function initOptions() {
        Dynum.init($scope.dynumName, $scope.options);
        $scope.dynumOptions = Dynum.values($scope.dynumName);
        $scope.chosenOption = Dynum.getByValue($scope.chosenOption, $scope.dynumName);
    }
}
