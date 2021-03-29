import { note, temp } from "../views/elements/note.js";

export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        note(temp.err(err));
        throw err;

    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {
            'Authorization': `Basic ${btoa('kid_HJmR2v1Su:c801f40cae1a4284bb05c51e2451f4de')}`,
            'Content-Type': 'application/json'
        }
    };
    const token = sessionStorage.getItem('token');
    if (token != null) {
        options.headers['Authorization'] = `Kinvey ${token}`;
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    // console.log(options)
    return options;
}

export async function get(url) {
    return await request(url, getOptions('get'));
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}
export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}


function _setSession(response) {
    sessionStorage.setItem('token', response._kmd.authtoken);
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('id', response._id);
    sessionStorage.setItem('subscriptions', response.subscriptions);
}
export async function login(username, password) {

    const response = await post(settings.host + '/user/kid_HJmR2v1Su/login', { username, password });
    _setSession(response);
    console.log(response)
    return response;
}

export async function register(username, password) {
    const subscriptions = [];
    const response = await post(settings.host + '/user/kid_HJmR2v1Su', { username, password, subscriptions });
    _setSession(response);
    return response;
}

export function logout() {
    const response = post(settings.host + '/user/kid_HJmR2v1Su/_logout');
    sessionStorage.clear();
    return response;
}