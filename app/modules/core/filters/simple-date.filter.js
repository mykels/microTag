angular.module('microTag.core')
    .filter('simpleDate', simpleDateFilter);

function simpleDateFilter($filter, StringUtils) {
    var simpleDateFormat = "dd/MM/yy HH:mm:ss";

    return function (date) {
        return isValid(date) ? $filter('date')(date, simpleDateFormat) : "";
    };

    function isValid(date) {
        return angular.isDate(date) && date.getTime() > 0 ||
            angular.isNumber(date) && date > 0 ||
            angular.isString(date) && StringUtils.isNotEmpty(date) && parseInt(date) > 0;
    }
}
