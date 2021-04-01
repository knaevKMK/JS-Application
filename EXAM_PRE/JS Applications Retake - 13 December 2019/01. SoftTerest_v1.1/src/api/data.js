import * as api from './api.js'
const host = `https://baas.kinvey.com`
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
    return await api.get(host + '/appdata/kid_HkzTFA44O/ideas');
}
export async function getItemById(id) {
    return await api.get(host + `/appdata/kid_HkzTFA44O/ideas/${id}`);
}
export async function getMyItems() {
    return await api.get(host + `/appdata/kid_HkzTFA44O/ideas`);
}
export async function createItem(data) {
    return await api.post(host + '/appdata/kid_HkzTFA44O/ideas', data);
}
export async function updateItem(id, data) {
    return await api.put(host + `/appdata/kid_HkzTFA44O/ideas/${id}`, data);
}

export async function deleteItem(id) {
    return await api.del(host + `/appdata/kid_HkzTFA44O/ideas/${id}`);
}