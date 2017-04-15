angular.module('microTag.utils')
	.service('MailUtils', mailUtilsService);

function mailUtilsService($window, ObjectUtils, StringUtils) {
	var self = this;

	/**
	 * Returns a URL for a mailto-link
	 * @param  {String} recipient    - recipient email address
	 * @param  {Object} options         - Options to construct the URL
	 * @param  {String} options.cc      - Cc recipient email address (optional)
	 * @param  {String} options.bcc     - Bcc recipient email address (optional)
	 * @param  {String} options.subject - Email subject (optional)
	 * @param  {String|Object} options.body    - Email body (optional). Separate lines with the newline character (\n)
	 * @return {String}              - Returns the URL to put into the href-attribute of a mailto link
	 */
	this.generateMailToLink = function (recipient, options) {
		var link = "mailto:";
		link += $window.encodeURIComponent(recipient);

		var params = [];
		angular.forEach(options, function (value, key) {
			if (isBody(key)) {
				value = stringifyBody(value);
			}

			params.push(key.toLowerCase() + "=" + $window.encodeURIComponent(value));
		});

		if (params.length > 0) {
			link += "?" + params.join("&");
		}

		return link;
	};

	this.sendMail = function (recipient, options) {
		var link = self.generateMailToLink(recipient, options);

		var a = $window.document.createElement('a');
		a.href = link;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	function isBody(property) {
		return StringUtils.compareToIgnoreCase(property, "body");
	}

	function stringifyBody(body) {
		return ObjectUtils.isObject(body) ? ObjectUtils.stringifyObject(body) : body;
	}
}
