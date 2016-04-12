angular
    .module('app')
    .filter('route', [
        '$http',
        '$log',
        function ($http, $log) {
            var base = '';

            var routes = getRoutes();

            function getRoutes () {
                return {
                    mddl_front_version: '/version',
                    mddl_logout: '/logout',
                    mddl_about_me: '/about/me',
                    mddl_api_user: '/api/user/{id}',
                    mddl_api_building: '/api/building'
                }
            }

            return function (value, params) {
                var route;
                var regexp;

                if (!angular.isString(value) || !angular.isString(route = routes[value])) {
                    $log.warn('Route not found ! ', value);
                    return value;
                }

                angular.forEach(params, function (val, key) {
                    regexp = new RegExp('{' + key + '}', 'gi');
                    route = route.replace(regexp, val);
                });

                regexp = new RegExp('{(.)*}', 'gi');
                route = route.replace(regexp, '');
                return base + route;
            }
        }
    ])
;