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
    return await api.get(host + '/jsonstore/posts');
}
export async function getItemById(id) {
    console.log(id)
    return await api.get(host + '/jsonstore/posts/' + id);
}
export async function getMyItems(userId) {
    const result = await getAllItems();
    console.log(result)
    return Object.keys(result).filter(r => result[r]._ownerId == userId);
}
export async function createItem(data) {
    return await api.post(host + '/jsonstore/posts', data);
}
export async function updateItem(id, data) {
    return await api.put(host + '/jsonstore/posts/' + id, data);
}

export async function deleteItem(id) {
    return await (await fetch(host + '/jsonstore/posts/' + id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    })).json();

}
export async function delComm(id) {
    console.log(id)
    return await (await fetch(host + '/jsonstore/comments/' + id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    })).json();

}
export async function getAllComments() {
    return await api.get(host + '/jsonstore/comments');
}
export async function createComment(data) {
    return await api.post(host + '/jsonstore/comments', data)
}