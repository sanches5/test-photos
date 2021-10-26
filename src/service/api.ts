import { stringify } from 'querystring';

export const fetchConfig = (url: string, method: string, body?: {}, params?: {}) => {
    let requestUrl = url;
    const configRequest = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json;charset=utf-8' })
    };

    if (body && Object.keys(body).length) {
        // @ts-ignore
        configRequest.body = JSON.stringify(body);
    }

    if (params) {
        requestUrl = url + '?' + stringify(params);
    }

    return fetch(requestUrl, configRequest)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then((response) => {
            console.debug(response);
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
};

