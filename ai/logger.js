import isObject from 'lodash/isObject'

function log(str) {
    if (isObject(str)) {
        str = JSON.stringify(str)
    }
    console.log("\x1B[32m LOG: "+str+"\x1B[0m");
}

function warn(str) {
    if (isObject(str)) {
        str = JSON.stringify(str)
    }
    console.warn("\x1B[93m WARNING: "+str+"\x1B[0m");
}

function error(str) {
    if (isObject(str)) {
        str = JSON.stringify(str)
    }
    console.error("\x1B[31m ERROR: "+str+"\x1B[0m");
}

function debug(str) {
    if (isObject(str)) {
        str = JSON.stringify(str)
    }
    console.error("\x1B[34m DEBUG: "+str+"\x1B[0m");
}

export default { log, warn, error, debug }
