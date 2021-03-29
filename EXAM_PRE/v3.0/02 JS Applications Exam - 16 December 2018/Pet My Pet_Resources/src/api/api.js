export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);
        console.log(response)
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {
            'Authorization': `Basic ${btoa('kid_SydiKQKE_:db686ad327654a7099753acbbfa8b576')}`,
            'Content-Type': 'application/json'
        }
    };

    const token = sessionStorage.getItem('token');
    // console.log(token)
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

//==================================================
//Login Register need Basic Auth with base64 app secret key from Kinvey;
function _setSession(response) {
    sessionStorage.setItem('token', response._kmd.authtoken);
    sessionStorage.setItem('email', response.username);
    sessionStorage.setItem('id', response._id);
}
//WORK login
export async function login(email, password) {
    const response = await post('https://baas.kinvey.com/user/kid_SydiKQKE_/login', ({ 'username': email, 'password': password }));
    _setSession(response);
    return response;
}

//WORK register
export async function register(email, password) {
    const response = await post('https://baas.kinvey.com/user/kid_SydiKQKE_', ({ 'username': email, 'password': password }));
    _setSession(response);
    return response;
}
//Work logout
export async function logout() {
    return await post('https://baas.kinvey.com/user/kid_SydiKQKE_/_logout');
}
//====================================================================