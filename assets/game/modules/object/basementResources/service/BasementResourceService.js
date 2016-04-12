angular
    .module('app')
    .service('BasementResourceService', [
        '$filter',
        '$http',
        'PubSubStamp',
        function ($filter, $http, PubSubStamp) {
            const route = $filter('route');
            const stream = PubSubStamp();
            const basements = {
                'B1': {
                    resources: {
                        metal: 1500
                    }
                }
            };

            return {
                subscribe: stream.subscribe,
                consume (basementId, resources) {
                    var basement = _.get(basements, '[' + basementId + ']')

                    const allResourcesAvailable = _.every(resources, (amount, name) => {
                        return amount <= basement.resources[name];
                    });

                    if (!allResourcesAvailable) {
                        return false;
                    }

                    _.forEach(resources, (amount, name) => {
                        basement.resources[name] -= amount;
                    });

                    stream.publish({
                        basementId: basementId,
                        resources: basements[basementId].resources
                    });

                    return basement.resources;
                },
                getForBasement (id) {
                    return basements[id].resources;
                    //var url = route('mddl_api_basement_resources_get', {basement: id});
                    //
                    //return $http.get(url).then(({ data }) => {
                    //    basements.push({
                    //        basementId: id,
                    //        resources: data
                    //    });
                    //});
                }
            }
        }
    ])