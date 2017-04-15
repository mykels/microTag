angular.module('microTag.utils')
    .service('ConstantUtils', constantUtilsService);

function constantUtilsService(ObjectUtils, StringUtils) {
    this.getByValue = function (value, constantDescriptor) {
        return (ObjectUtils.isNumber(value) || ObjectUtils.isNotEmpty(value)) ?
            ObjectUtils.defaultValue(_.find(constantDescriptor.values, function (constantElement) {
                return StringUtils.compareToIgnoreCase(constantElement.value, value);
            }), constantDescriptor.default) :
            constantDescriptor.default;
    };

    this.getByStringValue = function (constantValues, value) {
        if (angular.isString(value)) {
            return _.find(constantValues, function (constantElement) {
                return StringUtils.compareToIgnoreCase(constantElement.value, value);
            });
        }
    };
    
	this.getByProperty = function (constantValues, property, propertyValue) {
		if (angular.isString(property) && angular.isString(propertyValue)) {
			return _.find(constantValues, function (constantElement) {
				return StringUtils.compareToIgnoreCase(constantElement[property], propertyValue);
			});
		}
	};

    this.defaultValue = function (constantElement, constantDescriptor) {
        var constantValue = !ObjectUtils.isObject(constantElement) ? constantElement :
            angular.isDefined(constantElement) ? constantElement.value : undefined;

        return ObjectUtils.defaultValue(constantValue, constantDescriptor.default.value);
    };
}
