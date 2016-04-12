angular
    .module('app')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    $state.go('app.home');
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
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateProvider: [
                        '$templateCache',
                        function ($templateCache) {
                            return $templateCache.get('app.html');
                        }
                    ],
                    controller: 'AppController',
                    controllerAs: 'app',
                    resolve: {
                        authorize: [
                            '$state',
                            '$log',
                            'AuthService',
                            '$window',
                            function ($state, $log, AuthService, $window) {
                                var promise = AuthService.authenticate();

                                promise.success(function () {
                                    $log.info('User is connected');
                                }).error(function () {
                                    $log.info('User is not connected ! Redirecting to login...');
                                    $state.go('auth.login');
                                });

                                return promise;
                            }
                        ]
                    }
                })
                .state('app.home', {
                    title: 'home',
                    url: '/home',
                    views: {
                        'center': {
                            templateProvider: [
                                '$templateCache',
                                function ($templateCache) {
                                    return $templateCache.get('home/templates/home-center.html');
                                }
                            ]
                        },
                        'right': {
                            templateProvider: [
                                '$templateCache',
                                function ($templateCache) {
                                    return $templateCache.get('home/templates/home-right.html');
                                }
                            ]
                        }
                    }
                })
                .state('app.profile', {
                    url: '/profile',
                    views: {
                        'center': {
                            templateProvider: [
                                '$templateCache',
                                function ($templateCache) {
                                    return $templateCache.get('profile/templates/profile-center.html');
                                }
                            ]
                        },
                        'right': {
                            templateProvider: [
                                '$templateCache',
                                function ($templateCache) {
                                    return $templateCache.get('profile/templates/profile-right.html');
                                }
                            ]
                        }
                    }
                })
        }]);
