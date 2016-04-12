/* global Draggable */
angular
    .module('app')
    .directive('mwDraggable', [
        function () {
            return {
                link: function (scope, element) {
                    new Draggable(element[0], {//eslint-disable-line no-new
                        limit: document.body
                    });
                }
            }
        }]);