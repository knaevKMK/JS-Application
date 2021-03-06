import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getFormData(form) {
    const formData = new FormData(form);
    return [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}


//===========================================================
export async function getAllItems() {
    const data = await (await fetch(host + `data/cars`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result;
}
export async function deleteItem(id) {
    return await api.del(host + 'data/cars/' + id)
}

export async function getItemById(teamId) {
    return await (await fetch(host + `data/cars/` + teamId)).json();
}

export async function getMyItems(username) {
    return await api.get(host + `data/cars?where=seller%3D%22${username}%22`);
}

export async function editItem(itemId, data) {
    const token = sessionStorage.getItem('token');
    console.log(itemId);
    console.log(data);
    return await (await fetch(host + `data/cars/${itemId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json()
}
export async function createItem(data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch(host + 'data/cars', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}
//=================================================