(function (window, navigator) {
    'use strict';

    function getMatchingLocale (browserLocale, locales) {
        for (var i = 0, l = locales.length, locale; i < l; i++) {
            locale = locales[i];

            if (browserLocale.indexOf(locale) >= 0) return locale;
        }

        return null;
    }

    window.getLocale = function (locales, defaultLocale) {
        if (typeof defaultLocale != 'string') defaultLocale = locales[0];

        if (!navigator) return defaultLocale;

        var locale;

        if (navigator.languages instanceof Array) {
            locale = getMatchingLocale(navigator.languages[0], locales);
            if (locale) return locale;
        }

        console.log('waaaat');

        if (typeof navigator.language == 'string') {
            locale = getMatchingLocale(navigator.language, locales);
            if (locale) return locale;
        }

        if (typeof navigator.browserLanguage == 'string') {
            locale = getMatchingLocale(navigator.browserLanguage, locales);
            if (locale) return locale;
        }

        if (typeof navigator.systemLanguage == 'string') {
            locale = getMatchingLocale(navigator.systemLanguage, locales);
            if (locale) return locale;
        }

        if (typeof navigator.userLanguage == 'string') {
            locale = getMatchingLocale(navigator.userLanguage, locales);
            if (locale) return locale;
        }

        return defaultLocale;
    };
})(window, navigator);