angular
    .module('app')
    .component('mwTimer', {
        bindings: {
            from: '=',
            onEnd: '&'
        },
        controller: [
            '$timeout',
            '$log',
            function ($timeout, $log) {
                const vm = this;

                timeout();
                function timeout () {
                    $timeout(() => {
                        vm.from -= 1;

                        if (vm.from === -1) {
                            if (angular.isFunction(vm.onEnd)) {
                                vm.onEnd();
                            } else if (vm.onEnd) {
                                $log.warn('onEnd is not a function ! ' + typeof vm.onEnd + ' given. ', vm.onEnd);
                            }
                        } else {
                            timeout();
                        }
                    }, 1000);
                }
            }
        ],
        template: `
            <span>{{ $ctrl.from }}</span>
        `
    });