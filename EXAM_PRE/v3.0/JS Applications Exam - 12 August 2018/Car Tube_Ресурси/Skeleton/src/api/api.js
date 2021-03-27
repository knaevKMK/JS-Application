import { note, temp } from "../views/elements/note.js";

export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok == false) {
            const error = await response.json();
            note(temp.err(error.message));
            throw Error(error.message)
        }
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
            throw Error
        }
    } catch (err) {
        note(temp.err(err.message));
        throw new Error(err);
    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {}
    };
    const token = sessionStorage.getItem('token');
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
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
    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('id', response._id);
    // sessionStorage.setItem('gender', response.gender);
    // sessionStorage.setItem('username', response.username);
}
export async function login(email, password) {

    const response = await post(settings.host + 'users/login', { email, password });
    _setSession(response);
    return response;
}

export async function register(email, password) {
    const response = await post(settings.host + 'users/register', { email, password });
    console.log(response)
    _setSession(response);
    return response;
}

export async function logout() {
    const response = await get(settings.host + 'users/logout');
    sessionStorage.clear();
    return response;
}