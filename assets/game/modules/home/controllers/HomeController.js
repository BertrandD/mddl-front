angular
    .module('app')
    .controller('HomeController', [
        'BuildingService',
        'BasementResourceService',
        function (BuildingService, BasementResourceService) {
            const vm = this;

            vm.build = build;
            vm.upgrade = upgrade;
            vm.completeBuild = completeBuild;
            vm.isPresentInQueue = isPresentInQueue;

            vm.basement = {
                _id: 'B1',
                name: 'B1',
                buildings: []
            };

            vm.buildingQueue = [];

            vm.availableBuildings = [
                {
                    _id: '1',
                    name: 'Metal mine',
                    description: 'A little description',
                    maxLevel: 30,
                    build_time: 10,
                    health: 2000,
                    modifiers: {
                        add: {},
                        sub: {},
                        mul: {}
                    },
                    dependencies: {
                        resources: {
                            metal: 10
                        },
                        technologies: {},
                        buildings: {}
                    }
                },
                {
                    _id: '2',
                    name: 'Engine Warehouse',
                    description: 'A little description',
                    maxLevel: 30,
                    build_time: 3,
                    health: 2000,
                    modifiers: {
                        add: { engine_storage: 20 },
                        sub: {},
                        mul: {}
                    },
                    dependencies: {
                        resources: {
                            metal: 10
                        },
                        technologies: {},
                        buildings: {}
                    }
                },
                {
                    _id: '3',
                    name: 'Test',
                    description: '',
                    maxLevel: 30,
                    build_time: 60,
                    health: 2000,
                    modifiers: {
                        add: { engine_storage: 20 },
                        sub: {},
                        mul: {}
                    },
                    dependencies: {
                        resources: {
                            metal: 10
                        },
                        technologies: {},
                        buildings: {}
                    }
                }
            ];

            //BuildingService.query().then(({ data }) => {
            //    vm.availableBuildings = data;
            //});

            function build (model) {
                if (BasementResourceService.consume(vm.basement._id, model.dependencies.resources) === false) return;

                let building = angular.copy(model);
                building.level = building.level ? building.level : 0;
                building._id = _.uniqueId('b_');
                addBuildingToQueue(building);
            }

            function upgrade (building) {
                if (isPresentInQueue(building)) return;
                if (BasementResourceService.consume(vm.basement._id, building.dependencies.resources) === false) return;
                addBuildingToQueue(building);
            }

            function isPresentInQueue (building) {
                return _.some(vm.buildingQueue, (elem) => {
                    return elem.building._id === building._id;
                });
            }

            function addBuildingToQueue (building) {
                vm.buildingQueue.push({
                    building: building,
                    timeLeft: building.build_time
                })
            }

            function completeBuild (queue) {
                queue.building.created_at = Date.now();
                queue.building.level = queue.building.level ? queue.building.level + 1 : 1;

                const isPresent = _.some(vm.basement.buildings, (building) => {
                    return building._id === queue.building._id;
                });

                if (!isPresent) {
                    vm.basement.buildings.push(queue.building);
                }

                _.remove(vm.buildingQueue, (elem) => {
                    return elem.building._id === queue.building._id;
                })
            }
        }]);
