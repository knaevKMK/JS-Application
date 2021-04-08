import { _user } from './utility.js'


export const settings = { host: '' };

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
        window.alert(err.message);
        throw err;

    }
}

function createOptions(method, body) {
    const options = {
        method,
        headers: {
            //   'Content-Type': 'application/json'
        }
    };
    const user = _user.getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }
    if (body) {
        //some CRUD fault about this header. It is need every time
        options.headers['Content-Type'] = 'application/json';
        //=======================================================
        options.body = JSON.stringify(body);
    }
    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}
export async function post(url, data) {
    return await request(url, createOptions('post', data));
}
export async function put(url, data) {
    return await request(url, createOptions('put', data));
}
export async function del(url) {
    return await request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post(settings.host + '/users/login', { username, password });
    _user.setUserData(result);
    return result;
}
export async function register(username, password) {
    const result = await post(settings.host + '/users/register', { username, password });
    _user.setUserData(result);
    return result;
}

export function logout() {
    const result = get(settings.host + '/users/logout');
    _user.clearUserData(result);
    return result;
}