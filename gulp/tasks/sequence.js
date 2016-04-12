var runSequence = require('run-sequence');

module.exports = function (config) {
    return [
        function (done) {
            runSequence.apply(null, config.sequence.concat(done));
        }
    ];
};