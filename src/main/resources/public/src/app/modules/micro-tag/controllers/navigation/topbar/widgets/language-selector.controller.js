angular.module('microTag')
    .controller('LanguageSelectorController', languageSelectorController);

function languageSelectorController($scope, Languages, LanguageService) {
    activate();

    $scope.selectLanguage = selectLanguage;

    function activate() {
        initLanguages();
        initHandler();
        initCurrentLanguage();
    }

    function initLanguages() {
        LanguageService.getAvailableLanguages().then(function (languages) {
            $scope.languages = languages;
        });
    }

    function initHandler() {
        $scope.languageHandler = {
            selected: Languages.default
        };
    }

    function initCurrentLanguage() {
        var locale = LanguageService.getCurrentLocale();

        if (angular.isDefined(locale)) {
            selectLanguage(Languages.getByProperty("locale", locale));
        }
    }

    function selectLanguage(language) {
        $scope.languageHandler.selected = language;
        LanguageService.set(language.locale);

        if (angular.isDefined($scope.onSelect)) {
            $scope.onSelect({language: language});
        }
    }
}
