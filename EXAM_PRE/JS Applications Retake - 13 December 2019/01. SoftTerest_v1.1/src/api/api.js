import { note, temp } from '../views/elements/note.js';
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
        note(temp.err(err.message));
        throw err;

    }
}

function createOptions(method, body) {
    const options = {
        method,
        headers: {
            'Authorization': `Basic ${btoa('kid_HkzTFA44O:8c2d4cf18a7b423db7b2f961297d09e4')}`,
            'Content-Type': 'application/json'
        }
    };
    const user = _user.getUserData();
    console.log(user)
    if (user) {

        options.headers['Authorization'] = `Kinvey ${user._kmd.authtoken}`;
    }
    if (body) {
        //some CRUD fault about this header. It is need every time
        //   options.headers['Content-Type'] = 'application/json';
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
    const result = await post(settings.host + '/user/kid_HkzTFA44O/login', { username, password });
    _user.setUserData(result);
    return result;
}
export async function register(username, password) {
    const result = await post(settings.host + '/user/kid_HkzTFA44O', { username, password });
    _user.setUserData(result);
    return result;
}

export function logout() {
    const result = post(settings.host + '/user/kid_HkzTFA44O/_logout');
    _user.clearUserData(result);
    return result;
}