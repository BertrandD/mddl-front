angular
    .module('app')
    .service('UserService', [
        '$http',
        '$filter',
        function ($http, $filter) {
            var route = $filter('route');

            return {
                get (id) {
                    var url = route('mddl_api_user', { id });

                    return $http.get(url);
                },
                aboutMe () {
                    var url = route('mddl_about_me');

                    return $http.get(url);
                },
                logout () {
                    var url = route('mddl_logout');

                    return $http.get(url)
                }
            }
        }
    ]);
