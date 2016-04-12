/* global getLocale */
angular
    .module('app')
    .controller('AppController', [
        '$rootScope',
        '$log',
        '$state',
        '$http',
        '$window',
        '$filter',
        '$translate',
        'AuthService',
        'UserService',
        'NotificationService',
        'BasementResourceService',
        function ($rootScope, $log, $state, $http, $window, $filter, $translate, AuthService, UserService, NotificationService, BasementResourceService) {
            var vm = this;

            vm.me = AuthService.getUser();
            vm.dateFormat = 'EEE dd MMM yyyy HH:mm:ss';
            vm.availableLanguages = ['fr', 'en'];
            vm.language = getLocale(vm.availableLanguages);
            vm.state = {
                title: $state.current.title ? $state.current.title : '',
                subtitle: $state.current.subtitle ? $state.current.subtitle : ''
            };

            var route = $filter('route');
            $http.get(route('mddl_front_version')).then(function (res) {
                vm.version = res.data;
            });

            vm.logout = logout;
            vm.isState = isState;
            vm.sendNotif = sendNotif;

            vm.changeLanguage = changeLanguage;
            vm.consumeResources = consumeResources;

            function changeLanguage () {
                $translate.use(vm.language);
            }

            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                $log.warn('$stateNotFound ' + unfoundState.to);
                $log.warn(unfoundState, fromState, fromParams);
            });

            function consumeResources () {
                BasementResourceService.consume('B1', { 'metal': 100 });
            }

            function sendNotif () {
                vm.num = vm.num ? vm.num + 1 : 1;
                NotificationService.send('Test notification ' + vm.num);
            }

            function isState (stateName) {
                return $state.current.name === stateName;
            }

            function logout () {
                UserService.logout(() => {
                    $window.location.href = '/';
                });
            }
        }]);
