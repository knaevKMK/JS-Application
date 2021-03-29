import * as api from './api.js';
const host = 'https://baas.kinvey.com';
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
export async function getAllChirps(subs) {
    const data = await api.get(host + `/appdata/kid_HJmR2v1Su/chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": 1}`);
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result;
}

export async function createChirps(data) {
    return await api.post(host + '/appdata/kid_HJmR2v1Su/chirps', data);
}

export async function deleteChirps(id) {
    return await api.del(host + '/appdata/kid_HJmR2v1Su/chirps/' + id)
}

export async function getChirpById(id) {
    return await api.get(host + `/appdata/kid_HJmR2v1Su/chirps` + id);
}

export async function getMyChirps(username) {
    return await api.get(host + `/appdata/kid_HJmR2v1Su/chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`);
}

export async function getCountChirps(username) {
    return await api.get(host + `/appdata/kid_HJmR2v1Su/chirps?query={"author":"${username}"}`);
}

export async function getFollowers(username) {
    return await api.get(`https://baas.kinvey.com/user/kid_HJmR2v1Su/?query={"subscriptions":"${username}"}`)
}
export async function getDiscover() {
    return await api.get(`https://baas.kinvey.com/user/kid_HJmR2v1Su`);
}
export async function getUser(id) {
    return await api.get(`https://baas.kinvey.com/user/kid_HJmR2v1Su/` + id);
}
export async function getFollowing(username) {
    return await api.get(`https://baas.kinvey.com/user/kid_HJmR2v1Su/?query={"username":"${username}"}`)
}
export async function follow(userId, data) {
    return await api.post(`https://baas.kinvey.com/user/kid_HJmR2v1Su/` + userId, data)
}
export async function unFollowing(user_id, data) {
    return await api.post(`https://baas.kinvey.com/user/kid_HJmR2v1Su/${user_id}`, data)
}