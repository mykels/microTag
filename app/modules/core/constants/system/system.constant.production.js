angular.module('microTag.core')
    .value('System', {
        isProd: true,
        useDefault: false,   // if true use default host and port, otherwise parse it from the current url (should be false in production!)
        defaultProtocol: "http",
        defaultHost: "localhost",
        defaultPort: "8080",
        rootContext: "ServiceManager",
        localStoragePrefix: "serviceManagerLocalStorage",
        baseUrl: "", // initialized using systemConfig
        debugLevel: 4,// 0 - debug | 1 - info | 2 - warn | 3 - error | 4 - production
        bypassLicense: false, // should be false in production!
        checkRecordCompatibility: true,// should be true in production!
        enableDebugInfo: false // should be false in production!
    });
