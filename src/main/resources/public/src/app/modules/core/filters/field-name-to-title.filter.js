angular.module('microTag.core')
    .filter('fieldNameToTitle', fieldNameToTitleFilter);

function fieldNameToTitleFilter() {

    return function (name) {
        return name.replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) {
                return str.toUpperCase();
            });
    }
}
