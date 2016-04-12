angular.module('app')
    .controller('AppController', [
        '$scope',
        '$state',
        'AuthService',
        'UserService',
        //'toaster',
        //'blockUI',
        function ($scope, $state, AuthService, UserService/*, toaster, blockUI*/) {
            var vm = this;

            vm.me = AuthService.getUser();
            vm.dateFormat = 'EEE dd MMM yyyy HH:mm:ss';
            vm.state = {
                title: $state.current.title ? $state.current.title : '',
                subtitle: $state.current.subtitle ? $state.current.subtitle : ''
            };

            vm.logout = logout;
            vm.isState = isState;

            function isState (stateName) {
                return $state.current.name === stateName;
            }

            function logout () {
                UserService.logout();
                $state.go('auth.login');
            }
        }]);
