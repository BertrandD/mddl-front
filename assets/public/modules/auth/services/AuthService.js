angular
    .module('app')
    .service('AuthService', [
        '$http',
        function ($http) {
            var logged = false;
            var user = {};

            return {
                authenticate: function (success, error) {
                    var self = this;

                    $http({
                        method: 'GET',
                        url: '/about/me'
                    }).then(function successCallback (response) {
                        if (response && response.data._id) {
                            self.setLogged(true);
                            self.setUser(response);

                            if (angular.isFunction(success)) {
                                success();
                            }
                        } else {
                            self.setLogged(false);
                            self.setUser({});
                            error();
                        }
                    }, function errorCallback () {
                        self.setLogged(false);
                        if (angular.isFunction(error)) {
                            error();
                        }
                    });
                },

                isLogged: function () {
                    return logged;
                },

                setLogged: function (bool) {
                    logged = bool;
                },

                setUser: function (u) {
                    user = u;
                },

                getUser: function () {
                    return user;
                }
            };
        }
    ]);
