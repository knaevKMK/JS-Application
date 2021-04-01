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
    }), {})
}
export async function getAllItems() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}
export async function getItemById(id) {
    return await api.get(host + '/data/memes/' + id);
}
export async function getMyItems(userId) {
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function createItem(data) {
    return await api.post(host + '/data/memes', data);
}
export async function updateItem(id, data) {
    return await api.put(host + '/data/memes/' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/data/memes/' + id);
}