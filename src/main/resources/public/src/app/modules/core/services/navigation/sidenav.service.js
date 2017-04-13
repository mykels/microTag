angular.module('microTag')
	.service('SidenavService', sidenavService);

function sidenavService($mdSidenav, $mdMedia, EventEmitter, DocumentUtils) {
	var self = this;

	activate();

	function activate() {
		self.sidenavId = "microTagSidenav";
		self.sidenav = {opened: false};

		registerEventListeners();
	}

	function registerEventListeners() {
		EventEmitter.subscribe('widgetBarCollapsed', handleWidgetBarCollapsed);
	}

	function handleWidgetBarCollapsed() {
		self.close();
	}

	this.toggle = function () {
		if (self.sidenav.opened) {
			self.close();
		} else {
			self.open();
		}
	};

	this.close = function () {
		DocumentUtils.toTheTop();
		getSidenav().close().then(function () {
			self.sidenav.opened = false;
		});
		EventEmitter.publish('sidenavClosed');
	};

	this.open = function () {
		getSidenav().open().then(function () {
			self.sidenav.opened = true;
		});

		EventEmitter.publish('sidenavOpened');
	};

	this.isShown = function () {
		return getSidenav().isOpen();
	};

	this.isOpened = function () {
		return !$mdMedia('gt-md') && self.isShown();
	};

	function getSidenav() {
		return $mdSidenav(self.sidenavId);
	}

}
