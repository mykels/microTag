// TODO: should be propagated as service?
angular.module('microTag.core')
	.value('System', {
		isProd: false,
		useDefault: true, // if true use default host and port, otherwise parse it from the current url (should be false in production!)
		defaultProtocol: "http",
		defaultHost: "localhost",
		defaultPort: "7000",
		appName: "μicroTag",
		version: '0.1',
		isMobile: (function () {// true if the browser is a mobile device
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		})(),
		layout: {
			isNavbarFixed: true, //true if you want to initialize the template with fixed header
			isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
			isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
			isFooterFixed: true, // true if you want to initialize the template with fixed footer
			mainContentVisible: true, // true if you want to make the main content visible
			theme: 'main-theme', // indicate the theme chosen for your project
			logo: 'assets/images/micro-tag-logo-big.jpg' // relative path of the project logo
		},
		baseUrl: "", // initialized using systemLoader
		year: "" // initialized using systemLoader
	});
