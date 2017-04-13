angular.module('microTag.core')
	.service('Languages', languagesConstants);

function languagesConstants() {
	var self = this;

	activate();

	function activate() {
		self.values = [
			{name: "English", locale: "en"},
			{name: "Russian", locale: "ru"},
			{name: "Italian", locale: "it"},
			{name: "Chinese", locale: "zh"},
			{name: "Japanese", locale: "ja"}
		];

		self.default = self.values[0];
	}
}
