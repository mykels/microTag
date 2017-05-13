angular.module('microTag.core')
    .service('Dynum', dynumConstants);

function dynumConstants(ConstantUtils) {
    var self = this;
    self.dynums = {};

    self.init = function (name, options) {
        self.dynums[name] = {};

        self.dynums[name].values = options.map(function (option) {
            return {
                type: "enum",
                value: option,
                text: option
            }
        });

        self.dynums[name].default = self.dynums[name].values[0];
    };

    self.values = function (name) {
        return self.dynums[name].values;
    };

    self.getByValue = function (constantElement, name) {
        return ConstantUtils.getByValue(constantElement, self.dynums[name]);
    };
}
