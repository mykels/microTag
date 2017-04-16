angular.module('microTag.core')
    .directive('mtFullHeight', fullHeightDirective);

function fullHeightDirective($window, $timeout, ObjectUtils) {
    return {
        restrict: 'A',
        scope: {
            isEnabled: '=?',
            additionalPadding: '@',
            debounceWait: '@',
            onResize: '&'
        },
        link: function (scope, element, attrs) {
            scope.isEnabled = ObjectUtils.defaultValue(scope.isEnabled, true);

            if (scope.debounceWait === 0 && scope.isEnabled) {
                angular.element($window).on('resize', windowResize);
            } else {
                angular.element($window).on('resize', debounce(onWindowResize, scope.debounceWait || 250));
            }

            onWindowResize();

            function debounce(fn, time) {
                var timeout;
                return function () {
                    var context = this;
                    var args = arguments;
                    var later = function () {
                        timeout = null;
                        fn.apply(context, args);
                    };
                    $timeout.cancel(timeout);
                    timeout = $timeout(later, time);
                };
            }

            function onWindowResize() {
                var footerElementHeight = 122;

                var elementBottomMarginAndBorderHeight = getBottomMarginAndBorderHeight(element);

                var additionalPadding = scope.additionalPadding || 0;

                var elementHeight = $window.innerHeight - elementBottomMarginAndBorderHeight - footerElementHeight - additionalPadding;

                if (scope.isEnabled) {
                    element.css('height', elementHeight + 'px');

                    if (scope.onResize) {
                        scope.onResize({
                            'height': elementHeight
                        });
                    }
                }
            }

            function getBottomMarginAndBorderHeight(element) {
                var footerBottomMarginHeight = getCssNumeric(element, 'margin-bottom');
                var footerBottomBorderHeight = getCssNumeric(element, 'border-bottom-width');
                return footerBottomMarginHeight + footerBottomBorderHeight;
            }

            function getCssNumeric(element, propertyName) {
                return parseInt(element.css(propertyName), 10) || 0;
            }
        }
    };
}
