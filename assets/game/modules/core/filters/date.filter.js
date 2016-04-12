angular.module('app')
    .filter('date', [
        '$filter',
        function ($filter) {
            return function (input) {
                return $filter('amDateFormat')(input, 'D MMMM YYYY - HH:mm');
            };
        }]);
