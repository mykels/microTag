angular.module('microTag.utils')
	.service('ObjectUtils', objectUtilsService);

function objectUtilsService() {
	var self = this;

	this.isEmpty = function (obj) {
		return _.isEmpty(obj);
	};

	this.isNotEmpty = function (obj) {
		return !self.isEmpty(obj);
	};

	this.defaultValue = function (value, defaultValue, valueTransformer) {
		return hasValue(value) ?
			(angular.isDefined(valueTransformer) ? valueTransformer(value) : value) : defaultValue;
	};

	function hasValue(value) {
		return angular.isString(value) ? !_.isEmpty(value) :
			angular.isDefined(value) && value !== null && value !== "null";
	}

	this.ifDefined = function (value, definedAction) {
		if (angular.isDefined(value)) {
			definedAction(value);
		}
	};

	this.isObject = function (value) {
		return value !== null && typeof value === 'object';
	};

	this.isNumber = function (value) {
		return (typeof value === "number") && Math.floor(value) === value;
	};

	this.setDefaultValue = function (object, property, defaultValue) {
		object[property] = self.defaultValue(object[property], defaultValue);
	};

	this.clone = function (object) {
		return angular.copy(object);
	};

	this.copyInto = function (source, destination) {
		return angular.copy(source, destination);
	};

	this.mergeObjects = function (object, mergedObject, merger) {
		if (angular.isUndefined(mergedObject)) {
			return object;
		}

		angular.forEach(object, function (value, key) {
			object[key] = merger(value, mergedObject[key]);
		});

		return object;
	};

	this.toArray = function (object) {
		var arr = [];

		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				arr.push(object[property]);
			}
		}

		return arr;
	};

	this.forEachProperty = function (object, propertyHandler) {
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				propertyHandler(property);
			}
		}
	};

	this.setProperties = function (object, value) {
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				object[property] = value;
			}
		}
	};

	this.getProperty = function (obj, prop) {
		var parts = prop.split('.');
		var clonedObj = angular.copy(obj);

		if (angular.isArray(parts)) {
			var last = parts.pop(),
				l = parts.length,
				i = 1,
				current = parts[0];

			while ((obj = obj[current]) && i < l) {
				current = parts[i];
				i++;
			}

			if (obj) {
				return obj[last];
			}
		}

		return clonedObj[prop];
	};

	this.stringifyObject = function (object) {
		var objectStr = "";
		angular.forEach(object, function (value, key) {
			if (angular.isDefined(value) && value.toString().length > 0) {
				objectStr += self.stringifyProperty(key) + " = " + value + "\n";
			}
		});

		return objectStr;
	};

	this.stringifyProperty = function (property) {
		return property.replace(/([A-Z])/g, ' $1')
			.replace(/^./, function (str) {
				return str.toUpperCase();
			});
	};

	this.override = function (src, override) {
		return self.isEmpty(override) ? src : angular.extend(angular.copy(src), override);
	};

	this.iterateProperties = function (obj, stack, action) {
		for (var property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (angular.isObject(obj[property])) {
					self.iterateProperties(obj[property], stack + '.' + property, action);
				} else if (angular.isDefined(action)) {
					action(obj, property);
				}
			}
		}
	};

	this.deepCompare = function (obj, objObj) {
		return JSON.stringify(obj) === JSON.stringify(objObj);
	};

	this.contains = function (obj, key) {
		return obj.hasOwnProperty(key);
	};
}
