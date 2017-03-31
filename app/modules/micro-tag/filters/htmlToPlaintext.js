'use strict';

angular.module("microTag")
	.filter('htmlToPlaintext', function () {
			return function (text) {
				return String(text).replace(/<[^>]+>/gm, '');
			};
		}
	);
