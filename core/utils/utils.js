import { fetch } from './post-as-form'
import config from '../config'

export function uid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

let offset = 0, loaded = false;

function calcOffset() {
    loaded = true;
    fetch(config.api.url+'/time').then(res => {
        const dateStr = res.meta.time

        offset = dateStr - Date.now()
    })
}

function getServerTime() {
    if (!loaded) calcOffset()
    return Date.now() + offset;
}

window.getServerTime = getServerTime