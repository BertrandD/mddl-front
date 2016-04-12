/* global getLocale */

angular
    .module('app')
    .config([
        '$httpProvider',
        '$translateProvider',
        'LOCALE_EN',
        'LOCALE_FR',
        function ($httpProvider, $translateProvider, LOCALE_EN, LOCALE_FR) {

            $translateProvider.translations('en', LOCALE_EN);
            $translateProvider.translations('fr', LOCALE_FR);

            // Tell the module what language to use by default
            $translateProvider
                .useMessageFormatInterpolation()
                .preferredLanguage(getLocale(['en', 'fr']))
                .fallbackLanguage('en');

            $translateProvider.useSanitizeValueStrategy(null);

            $httpProvider.interceptors.push([
                '$q',
                'toaster',
                function ($q, toaster) {
                    return {
                        response: function (response) {

                            if (response.status >= 400) {
                                return $q.reject(response);
                            }

                            if (angular.isDefined(response.data.status) && response.data.status !== 'ok') {
                                if (response.data.message) {
                                    toaster.pop('error', response.data.message);
                                }
                                return $q.reject(response);
                            }

                            return response;
                        },

                        responseError: function (rejection) {
                            return $q.reject(rejection);
                        }
                    };
                }]);
        }]);

