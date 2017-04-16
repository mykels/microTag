angular.module('microTag.utils')
	.service('CollectionUtils', collectionUtilsService);

function collectionUtilsService($timeout, ObjectUtils) {
	var self = this;

	this.isNotEmpty = function (collection, notEmptyCallback, emptyCallback) {
		var nonEmptyCollection = angular.isDefined(collection) &&
			self.isArray(collection) &&
			collection.length > 0;

		if (nonEmptyCollection && angular.isDefined(notEmptyCallback)) {
			notEmptyCallback(collection);
		} else if (!nonEmptyCollection && angular.isDefined(emptyCallback)) {
			emptyCallback();
		}

		return nonEmptyCollection;
	};

	this.isEmpty = function (collection) {
		return angular.isUndefined(collection) ||
			(angular.isDefined(collection) &&
			self.isArray(collection) &&
			collection.length === 0);
	};

	this.isArray = function (object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	};

	this.findByProperty = function (collection, value, property) {
		if (angular.isUndefined(collection)) {
			return undefined;
		}
		return _.find(collection, function (element) {
			return value === ObjectUtils.getProperty(element, property);
		});
	};

	this.findByName = function (collection, entityName) {
		if (angular.isUndefined(collection)) {
			return undefined;
		}
		return _.find(collection, function (entity) {
			return ObjectUtils.isNotEmpty(entity) && entityName === entity.name;
		});
	};

	this.indexOf = function (collection, value, property) {
		for (var i = 0, len = collection.length; i < len; i++) {
			if (value === ObjectUtils.getProperty(collection[i], property)) {
				return i;
			}
		}
		return -1;
	};

	this.contains = function (collection, object) {
		return ObjectUtils.isNotEmpty(_.find(collection, function (element) {
			return object === element;
		}));
	};

	this.containsByProperty = function (collection, value, property) {
		var filtered = _.filter(collection, function (element) {
			return value === ObjectUtils.getProperty(element, property);
		});

		return self.isNotEmpty(filtered);
	};

	this.containsByName = function (collection, entityName) {
		return angular.isDefined(self.findByName(collection, entityName));
	};

	this.removeObjectByReference = function (collection, object) {
		return _.filter(collection, function (element) {
			return object !== element;
		});
	};

	this.filterByProperty = function (collection, propertyKey, propertyValue) {
		return _.filter(collection, function (element) {
			return propertyValue === ObjectUtils.getProperty(element, propertyKey);
		});
	};

	this.removeByProperty = function (collection, propertyKey, propertyValue) {
		return _.filter(collection, function (element) {
			return propertyValue !== ObjectUtils.getProperty(element, propertyKey);
		});
	};

	this.unique = function (array) {
		return array.filter(function (item, pos) {
			return array.indexOf(item) === pos;
		});
	};

	this.clone = function (array) {
		return _.map(array, _.clone);
	};

	this.equalsIgnoreOrder = function (array1, array2) {
		var sorted1 = angular.copy(array1);
		var sorted2 = angular.copy(array2);
		sorted1.sort();
		sorted2.sort();
		return sorted1.length === sorted2.length && sorted1.every(function (element, index) {
				return element === sorted2[index];
			});
	};

	this.removeDuplicates = function (collection, property) {
		return _.uniq(collection, false, function (item) {
			return angular.isDefined(property) ? ObjectUtils.getProperty(item, property) : item;
		});
	};

	this.reduce = function (collection, propertyReducer, valueReducer) {
		var reduced = {};

		collection.forEach(function (item) {
			reduced[propertyReducer(item)] = valueReducer(item);
		});

		return reduced;
	};

	this.filterEmptyEntities = function (entities) {
		return _.filter(entities, ObjectUtils.isNotEmpty);
	};

	this.fixIndices = function (collection) {
		var i;

		for (i = 0; i < collection.length; i++) {
			collection[i].index = i;
		}

		return collection;
	};

	this.deferCollectionLoad = function (collection, onLoadTrigger, deferTimeout) {
		if (self.isNotEmpty(collection)) {
			$timeout(onLoadTrigger, deferTimeout);
		} else {
			onLoadTrigger();
		}
	};

	this.join = function (collection, delimiter) {
		var joint = '';

		if (self.isEmpty(collection)) {
			return joint;
		}

		var fixedDelimiter = ObjectUtils.defaultValue(delimiter, '');

		collection.forEach(function (item) {
			joint += item + fixedDelimiter;
		});

		return joint.substring(0, joint.length - 1);
	};
}
