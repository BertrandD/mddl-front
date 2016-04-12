angular
    .module('app')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    $state.go('auth.login');
                });

            $stateProvider
                .state('auth', {
                    abstract: true,
                    url: '/auth',
                    templateProvider: [
                        '$templateCache',
                        function ($templateCache) {
                            return $templateCache.get('blank.html');
                        }
                    ]
                })
                .state('auth.login', {
                    url: '/login',
                    templateProvider: [
                        '$templateCache',
                        function ($templateCache) {
                            return $templateCache.get('auth/templates/login.html');
                        }
                    ]
                })
                ;
        }]);
