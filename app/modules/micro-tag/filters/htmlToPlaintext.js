angular.module("microTag")
	.filter('htmlToPlaintext', htmlToPlaintextFilter);

function htmlToPlaintextFilter() {
	return function (text) {
		return String(text).replace(/<[^>]+>/gm, '');
	};
}
