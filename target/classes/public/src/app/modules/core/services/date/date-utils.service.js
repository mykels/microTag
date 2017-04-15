angular.module('microTag.core')
	.service('DateUtils', dateUtilsService);

function dateUtilsService($filter, ObjectUtils) {
	var self = this;

	/**
	 * @param time
	 * @returns {number} diff in milliseconds from the current time
	 */
	this.getDiff = function (time) {
		return time - new Date().getTime();
	};

	this.toSeconds = function (time) {
		return time / 1000;
	};

	this.toMinutes = function (time) {
		return self.toSeconds(time) / 60;
	};

	this.toHours = function (time) {
		return self.toMinutes(time) / 60;
	};

	this.toDays = function (time) {
		return Math.floor(self.toHours(time) / 24);
	};

	this.stringify = function (time, format, delimiter) {
		if (angular.isUndefined(time)) {
			return undefined;
		}

		var fixedDelimiter = ObjectUtils.defaultValue(delimiter, '/');

		var date = ObjectUtils.isNumber(time) ? new Date(time) : time;
		return $filter('date')(date, ObjectUtils.defaultValue(format, "dd{0}MM{1}yyyy".format(fixedDelimiter, fixedDelimiter)));
	};
}
