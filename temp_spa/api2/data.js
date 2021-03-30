import * as api from './api_2.js'
const host = `http://localhost:3030`
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings() {
    return await api.get(host + '');
}
export async function getListById() {
    return await api.get(host + '');
}
export async function getMyList() {
    return await api.get(host + '');
}
export async function createList() {
    return await api.post(host + '');
}
export async function updateList() {
    return await api.put(host + '');
}

export async function deleteList() {
    return await api.del(host + '');
}