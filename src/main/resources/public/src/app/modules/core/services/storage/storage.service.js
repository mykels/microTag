angular.module('microTag')
    .service('StorageService', storageService);

function storageService(System, $localStorage) {
    var self = this;

    activate();

    function activate() {
        self.keyPrefix = System.appName + "_";
    }

    this.store = function (key, value) {
        $localStorage[getWrappedKey(key)] = value;
    };

    this.load = function (key) {
        return $localStorage[getWrappedKey(key)];
    };

    this.delete = function (key) {
        var wrappedKey = getWrappedKey(key);

        $localStorage.$reset({
            wrappedKey: undefined
        });
    };

    function getWrappedKey(key) {
        return self.keyPrefix + key;
    }
}
