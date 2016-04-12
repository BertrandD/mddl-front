angular.module('app')
    .controller('LoginController', [
        '$scope',
        '$window',
        '$state',
        '$http',
        'UserService',
        'toaster',
        function ($scope, $window, $state, $http, UserService, toaster) {

            var vm = this;

            vm.login = login;
            vm.register = register;
            vm.loading = false;

            $http.get('/version').then(function (res) {
                vm.version = res.data;
            });

            function login () {
                vm.message = '';
                vm.loading = true;
                UserService.login({ username: vm.username, password: vm.password }, function (response) {
                    toaster.pop('success', 'You are now connected !');
                    vm.loading = false;
                    $window.location.href = '/game';
                }, error);
            }

            function register () {
                vm.loading = true;
                UserService.register({ username: vm.username, password: vm.password }, function () {
                    toaster.pop('success', 'You are now connected !');
                    vm.loading = false;
                    $window.location.href = '/game';
                }, error);
            }

            function error (response) {
                vm.loading = false;
                if (response.data.message) {
                    toaster.pop('error', response.data.message);
                } else {
                    toaster.pop('error', 'An error occured !');
                }
            }

        }]);
