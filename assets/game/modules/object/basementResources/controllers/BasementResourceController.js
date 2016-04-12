angular
    .module('app')
    .controller('BasementResourceController', [
        'BasementResourceService',
        function (BasementResourceService) {
            const vm = this;

            vm.selectedBasement = {
                _id: 'B1'
            };

            vm.selectedBasement.resources = BasementResourceService.getForBasement(vm.selectedBasement._id);

            BasementResourceService.subscribe(({ basementId, resources }) => {
                if (basementId !== vm.selectedBasement) {
                    vm.selectedBasement.resources = resources;
                }
            })
        }
    ]);