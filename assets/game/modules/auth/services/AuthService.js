angular
    .module('app')
    .service('AuthService', [
        '$http',
        'UserService',
        function ($http, UserService) {
            var logged = false;
            var user = {};

            return {
                authenticate: function (success, error) {
                    var self = this;

                    var promise = UserService.aboutMe();

                    promise.then(function ({ data }) {
                        self.setLogged(true);
                        self.setUser(data);
                    }).catch(function () {
                        self.setLogged(false);
                    });

                    return promise;
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
