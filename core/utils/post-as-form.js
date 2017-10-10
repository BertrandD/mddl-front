// npm module - safe deep cloning
import clone from 'lodash/cloneDeep'

function makeAuthenticatedRequest(url, opts = {}) {
    if (localStorage && localStorage.getItem("token")) {
        opts.headers = opts.headers || {};
        opts.headers['X-auth-token'] = localStorage.getItem("token");
    } else {
        console.error("No token found in local storage", url, opts);
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
window.apiFetch = fetch;
export function fetch (url, data) {

    return makeAuthenticatedRequest(url, data)
        .catch(res => {
            throw {
                meta: {
                    message: ""+res
                }
            };
        })
        .then(res => {
           if (res.status === 401) {
               if(store && store.dispatch && push) {
                   store.dispatch(push('/login'));
               }
           }
           return res;
        })
        .then(res => {
            if (res.status >= 200 && res.status < 400) {
                return res;
            } else {
                const code = res.status;
                return res.json().then(res => {
                    res.meta = {
                        message : ""
                    };
                    switch (code) {
                        case 400: res.meta.message = "Unauthorized"; break;
                        case 500: res.meta.message = "Server Error"; break;
                        case 406: res.meta.message = res.message; break;
                        default: res.meta.message = "Unknown error"; break;
                    }
                    console.log(res);
                    throw res
                });
            }
        })
        .then(res => res.json())
}

export function put(url, data = {}) {
    return postAsForm(url, data, 'PUT')
}

export function postAsForm(url, data = {}, method = 'POST') {
    var response;
    try {
        //safe clone of data
        data = clone(data);

        //array that holds the items that get added into the form
        var form = [];

        //special handling for object/array data, arrays will use "model" as the container ns
        addItemsToForm(form, typeof data == 'object' ? [] : [options.name || 'model'], data);

        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: form.join('&')
        });

    } catch(err) {
        console.error("Error from server:", err && err.stack || err);
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