angular.module('microTag.core')
    .directive('mtFileChange', fileChangeDirective);

function fileChangeDirective($parse, $timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var attrHandler = $parse(attrs.mtFileChange);
            var handler = function (e) {
                $timeout(function () {
                    attrHandler($scope, {
                        $event: e,
                        files: e.target.files
                    });
                }, 10);
            };

            element[0].addEventListener('change', handler, false);
        }
    };
}
