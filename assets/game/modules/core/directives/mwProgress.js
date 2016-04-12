angular
    .module('app')
    .component('mwProgress', {
        bindings: {
            progress: '='
        },
        transclude: true,
        controller: [
            '$scope',
            function ($scope) {
                const vm = this;
            }
        ],
        template: `
            <div class="progress">
                <div class="progress-text" ng-transclude></div>
                <div class="progress-bar" ng-style="{width: $ctrl.progress+'%'}">&nbsp;</div>
            </div>
        `
    });