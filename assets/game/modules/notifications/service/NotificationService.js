angular
    .module('app')
    .service('NotificationService', [
        'PubSubStamp',
        function (PubSubStamp) {
            const stream = PubSubStamp();
            return {
                subscribe: stream.subscribe,
                send (content) {
                    stream.publish({ content })
                }
            }
        }
    ]);