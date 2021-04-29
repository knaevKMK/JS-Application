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
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}
export async function getItemById(id) {
    return await api.get(host + '/data/wiki/' + id);
}
export async function search(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}
export async function createItem(data) {
    return await api.post(host + '/data/wiki', data);
}
export async function updateItem(id, data) {
    return await api.put(host + '/data/wiki/' + id, data);
}

export async function deleteItem(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function getItemByCategory(){
   // return await(await fetch(host+)).json();
    return await api.get(host+`/data/wiki?sortBy=_createdOn%20desc&distinct=category`);
}