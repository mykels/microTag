angular.module('microTag')
	.service('MenuItemBuilder', menuItemBuilder);

function menuItemBuilder() {
	this.build = function (title, icon) {
		return {
			title: title,
			link: title.toLowerCase(),
			icon: icon
		};
	};
}
