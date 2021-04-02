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

    const result = await api.get(host + '/jsonstore/shoes');
    return Object.keys(result).map(k => result[k])
}
export async function getItemById(id) {
    return await api.get(host + '/jsonstore/shoes/' + id);
}
export async function getMyItems() {
    return await api.get(host + '');
}
export async function createItem(data) {
    return await api.post(host + '/jsonstore/shoes', data);
}
export async function updateItem(id, data) {
    return await api.put(host + '/jsonstore/shoes/' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/jsonstore/shoes/' + id);
}