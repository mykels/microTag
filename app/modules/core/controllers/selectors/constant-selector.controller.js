angular.module('microTag.core')
    .controller('ConstantSelectorController', constantSelectorController);

function constantSelectorController($scope, StringUtils, ObjectUtils) {
    activate();

    function activate() {
        initMode();
        initDefaults();
    }

    function initMode() {
        if (angular.isUndefined($scope.mode)) {
            $scope.mode = {edit: true};
        }
    }
    
    function initDefaults() {
    	$scope.searchEnabled = ObjectUtils.defaultValue($scope.searchEnabled, false);
    }

    $scope.handleConstantSelect = function (item) {
        $scope.chosenConstant = item;

        if (angular.isDefined($scope.onSelectCallback)) {
            $scope.onSelectCallback({constant: item});
        }
    };

    $scope.constantMatch = function (pattern) {
        return function (constant) {
            return StringUtils.contains(constant.value, pattern) ||
                (StringUtils.isNotEmpty(constant.text) &&
                StringUtils.contains(constant.text, pattern));
        };
    };
}
