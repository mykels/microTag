angular.module('microTag.core')
    .controller('SliderController', sliderController);

function sliderController($scope, ObjectUtils) {
    activate();

    function activate() {
        $scope.slider = {
            options: {
                floor: ObjectUtils.defaultValue($scope.sliderMin, 0, parseInt),
                ceil: ObjectUtils.defaultValue($scope.sliderMax, 10, parseInt),
                step: ObjectUtils.defaultValue($scope.sliderStep, 1, parseInt),
                showSelectionBar: true,
                selectionBarGradient: {
                    from: 'white',
                    to: '#3d96ff'
                }
            }
        };
    }
}
