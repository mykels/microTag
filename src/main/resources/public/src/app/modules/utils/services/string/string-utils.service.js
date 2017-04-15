angular.module('microTag.utils')
    .service('StringUtils', stringUtilsService);

function stringUtilsService(ObjectUtils, CollectionUtils) {
    var self = this;

    activate();

    function activate() {
        addFormatPrototype();
        addStartsWithPrototype();
        addEndsWithPrototype();
        addCapitalizePrototype();
    }

    this.isEmpty = function (str) {
        return str === null || _.isEmpty(str) || str === "null";
    };

    this.isNotEmpty = function (str) {
        return !self.isEmpty(str) && str.length > 0;
    };
    
    this.defaultValue = function (value, defaultValue) {
        return self.isNotEmpty(value) ? value : defaultValue;
    };

    this.contains = function (str, pattern, ignoreLowerCase) {
        str = ObjectUtils.defaultValue(str, '');
        pattern = ObjectUtils.defaultValue(pattern, '');
        ignoreLowerCase = ObjectUtils.defaultValue(ignoreLowerCase, true);

        if (ignoreLowerCase) {
            str = str.toString().toLowerCase();
            pattern = pattern.toString().toLowerCase();
        }

        return str.toString().indexOf(pattern.toString()) !== -1;
    };

    this.containsInCollection = function (str, collection) {
        return self.isNotEmpty(_.filter(collection, function (item) {
            return self.contains(str, item);
        }));
    };

    this.compareToIgnoreCase = function (str, otherStr) {
        return self.contains(str, otherStr) &&
            self.contains(otherStr, str);
    };

    this.replaceAll = function (str, find, replace) {
        var replaceExp = new RegExp(find, 'g');
        return str.replace(replaceExp, replace);
    };

    this.join = function (values, delimiter) {
        if (CollectionUtils.isEmpty(values)) {
            return '';
        } else if (values.length === 1) {
            return values[0];
        }

        var concatenated = '';

        for (var i = 0; i < values.length - 1; i++) {
            concatenated += values[i] + delimiter;
        }

        concatenated += values[values.length - 1];

        return concatenated;
    };

    this.connect = function (str) {
        return self.isEmpty(str) ? str : str.split(' ').join('');
    };

    this.replaceBlanks = function (str, replacer) {
        return self.isEmpty(str) ? '' : str.split(' ').join(replacer);
    };

    this.removeSpecialChars = function (str) {
        return str.replace(/[^a-zA-Z0-9\u0590-\u05FF_.]/g, '');
    };

    this.removeLeadingNumbers = function (str) {
        return str.replace(/^\d+/, '');
    };

    this.replaceXmlChars = function (str) {
        var tag = document.createElement('div');
        tag.innerHTML = str;

        return tag.innerText;
    };

    this.isInt = function (n) {
        return !isNaN(parseInt(n)) && (n % 1 === 0);
    };

    this.isFloat = function (n) {
        return !isNaN(parseFloat(n)) && !isNaN(n % 1) && (n % 1 !== 0);
    };
    
    this.isBoolean = function (str) {
        return str === "true" || str === "false";
    };

    this.parseBoolean = function (str) {
        return str === "true";
    };

    function addFormatPrototype() {
        if (!String.prototype.format) {
            String.prototype.format = function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] !== 'undefined' ? args[number] : 'undefined';
                });
            };
        }
    }

    function addStartsWithPrototype() {
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (prefix) {
                return this.indexOf(prefix) === 0;
            };
        }
    }

    function addEndsWithPrototype() {
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
        }
    }
    
    function addCapitalizePrototype() {
    	if (!String.prototype.capitalize) {
	    	String.prototype.capitalize = function() {
	    	    return this.charAt(0).toUpperCase() + this.slice(1);
	    	};
    	}
    }
}
