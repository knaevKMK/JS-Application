import * as api from './api.js'
const host = `http://localhost:3030`
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

export async function getAllListings() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}
export async function getListById(id) {
    return await api.get(host + '/data/cars/' + id);
}
export async function getMyList(userId) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function createList(data) {
    return await api.post(host + '/data/cars', data);
}
export async function updateList(id, data) {
    return await api.put(host + '/data/cars/' + id, data);
}

export async function deleteList(id) {
    console.log(id)
    return await api.del(host + '/data/cars/' + id);
}

export async function search(query) {
    console.log(typeof query)
    return await (await fetch(`http://localhost:3030/data/cars?where=year%3D${query}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })).json();
    //  return await api.get(`/data/cars?where=year%3D${query}`)
}