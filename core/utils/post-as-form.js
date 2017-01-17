// npm module - safe deep cloning
import clone from 'lodash/cloneDeep'

function makeAuthenticatedRequest(url, opts = {}) {
    if (localStorage && localStorage.getItem("token")) {
        opts.headers = opts.headers || {};
        opts.headers['X-auth-token'] = localStorage.getItem("token");
    } else {
        console.error("Yolooooooo", url, opts);
    }

    if (global && global.fetch) {
        return global.fetch(url, opts);
    } else {
        if (AI) {
            var globalFetch = require('node-fetch');
            return globalFetch(url, opts);
        }
    }

}

export function fetch (url, data) {

    return makeAuthenticatedRequest(url, data)
        //.then(res => {
        //    if (res.status == 401) {
        //        location.href = '/login';
        //    }
        //    return res;
        //})
        .then(res => res.json())
        .then(response => {
            if (response.status === "ok") {
                return response;
            } else {
                throw response;
            }
        })
}

export function postAsForm(url, data = {}) {
    var response;
    try {
        //safe clone of data
        data = clone(data);

        //array that holds the items that get added into the form
        var form = [];

        //special handling for object/array data, arrays will use "model" as the container ns
        addItemsToForm(form, typeof data == 'object' ? [] : [options.name || 'model'], data);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: form.join('&')
        });

    } catch(err) {
        //console.error("Error from server:", err && err.stack || err);
        err.response = response;
        throw err;
    }
}

function addItemsToForm(form, names, obj) {
    if (obj === undefined || obj === "" || obj === null) return addItemToForm(form, names, "");

    if (
        typeof obj == "string"
        || typeof obj == "number"
        || obj === true
        || obj === false
    ) return addItemToForm(form, names, obj);

    if (obj instanceof Date) return addItemToForm(form, names, obj.toJSON());

    // array or otherwise array-like
    if (obj instanceof Array) {
        return obj.forEach((v,i) => {
            names.push(`[${i}]`);
            addItemsToForm(form, names, v);
            names.pop();
        });
    }

    if (typeof obj === "object") {
        return Object.keys(obj).forEach((k)=>{
            names.push(k);
            addItemsToForm(form, names, obj[k]);
            names.pop();
        });
    }
}

function addItemToForm(form, names, value) {
    var name = encodeURIComponent(names.join('.').replace(/\.\[/g, '['));
    value = encodeURIComponent(value.toString());
    form.push(`${name}=${value}`);
}