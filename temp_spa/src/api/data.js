import * as api from './api.js'
const host = `http://localhost:3030`
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getFormData(form) {
    const fd = new FormData(form);
    return [...fd.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}

export async function getAllItems() {
    return await api.get(host + '');
}
export async function getItemById() {
    return await api.get(host + '');
}
export async function getMyItems() {
    return await api.get(host + '');
}
export async function createItem() {
    return await api.post(host + '');
}
export async function updateItem() {
    return await api.put(host + '');
}

export async function deleteItem() {
    return await api.del(host + '');
}