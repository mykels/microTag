angular.module('microTag.core')
    .service('LanguageService', languageService);

function languageService($translate, HttpCaller, Languages, StorageService) {
    var self = this;

    activate();

    function activate() {
        self.languageKey = 'language';

        self.languagesConfig = {
            type: 'Languages',
            getUrl: '/languages',
            // getUrl: '/languages.lua',
            logTitle: "Languages",
            unexpectedErrorLog: "Could not get available languages"
        };

        initDefaultLanguage();
    }

    function initDefaultLanguage() {
        var storedLanguage = StorageService.load(self.languageKey);

        if (angular.isDefined(storedLanguage)) {
            setLocale(storedLanguage);
        }
    }

    this.set = setLocale;

    function setLocale(locale) {
        self.currentLocale = locale;
        $translate.use(locale);
        StorageService.store(self.languageKey, locale);
    }

    this.getAvailableLanguages = function () {
        return HttpCaller.get(self.languagesConfig).then(function (languages) {
            return languages.map(function (language) {
                var locale = language.split(".")[0];
                return Languages.getByProperty("locale", locale);
            });
        });
    };

    this.getCurrentLocale = function () {
        return self.currentLocale;
    };
}
