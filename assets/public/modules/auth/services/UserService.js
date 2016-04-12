angular
    .module('app')
    .service('UserService', [
        '$resource',
        function ($resource) {
            return $resource('/api/user/:user', { user: '@user' }, {
                update: {
                    method: 'PUT'
                },
                login: {
                    method: 'POST',
                    url: '/login',
                    params: { username: '@username', password: '@password' }
                },
                register: {
                    method: 'POST',
                    url: '/register',
                    params: { username: '@username', password: '@password' }
                },
                logout: {
                    method: 'GET',
                    url: '/logout'
                }
            });
        }
    ]);
