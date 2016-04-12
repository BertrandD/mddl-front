angular.module('app').config([
    '$httpProvider',
    '$resourceProvider',
    function ($httpProvider, $resourceProvider) {

        $resourceProvider.defaults.stripTrailingSlashes = false;


        $httpProvider.interceptors.push([
            '$q',
            '$log',
            'toaster',
            function ($q, $log, toaster) {
                return {
                    response: function (response) {

                        if (response.status >= 400) {
                            return $q.reject(response);
                        }

                        if (angular.isDefined(response.data.status) && response.data.status !== 'ok') {
                            if (response.data.message) {
                                toaster.pop('error', response.data.message);
                            }
                            return $q.reject(response);
                        }

                        return response;
                    },

                    responseError: function (rejection) {
                        return $q.reject(rejection);
                    }
                };
            }]);
    }]);

