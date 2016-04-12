angular
    .module('app')
    .controller('NotificationController', [
        '$scope',
        '$timeout',
        'NotificationService',
        function ($scope, $timeout, NotificationService) {
            NotificationService.subscribe(onNewNotification, $scope);

            const duration = 3500;
            const vm = this;
            vm.notifications = [];

            function onNewNotification (notification) {
                vm.notifications.push(notification);
                $timeout(() => {
                    vm.notifications.shift();
                }, duration);
            }

        }
    ]);