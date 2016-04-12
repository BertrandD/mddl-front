angular
    .module('app')
    .service('BuildingService', [
        '$http',
        '$filter',
        function ($http, $filter) {
            const route = $filter('route');

            return {
                query () {
                    var url = route('mddl_api_building');

                    return $http.get(url);
                }
            }
        }
    ])