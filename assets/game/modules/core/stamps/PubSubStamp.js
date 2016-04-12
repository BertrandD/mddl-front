/* global stampit */

angular
    .module('app')
    .factory('PubSubStamp', [
        function () {
            return stampit({
                init () {
                    const callbacks = [];

                    this.subscribe = subscribe;
                    this.publish = publish;
                    this.unsubscribe = unsubscribe;
                    this.trigger = trigger;

                    function subscribe (callback, $scope = null) {
                        callback.$subscribed = true;
                        callbacks.push(callback);

                        if ($scope) {
                            $scope.$on('$destroy', unsubscribe.bind(null, callback))
                        }

                        return unsubscribe.bind(null, callback);
                    }

                    function publish (...args) {
                        // the callbacks array might get mutated while
                        // publishing an event and that would cause the forEach
                        // to have an unexpected behavior (not looping properly)
                        // this is why we're making a copy of the array via .slice()
                        // but then, while looping, we ensure that the callback has
                        // not been marked as $subscribed
                        callbacks.slice().forEach(function (callback) {
                            trigger(callback, ...args);
                        });
                    }

                    function unsubscribe (callback) {
                        const index = callbacks.indexOf(callback);

                        if (index === -1) return;

                        callbacks[index].$subscribed = false;
                        callbacks.splice(index, 1);
                    }

                    function trigger (callback, ...args) {
                        if (callback.$subscribed == null) {
                            throw new Error('PubSub cannot trigger an unregistered callback');
                        }

                        if (callback.$subscribed === false) return;
                        callback.apply({ unsubscribe: unsubscribe.bind(null, callback) }, args)
                    }
                }
            });
        }
    ])
;