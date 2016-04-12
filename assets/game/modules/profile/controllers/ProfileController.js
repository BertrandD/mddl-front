angular
    .module('app')
    .controller('ProfileController', [
        'AuthService',
        function (AuthService) {
            const vm = this;

            vm.profile = AuthService.getUser();
        }
    ]);