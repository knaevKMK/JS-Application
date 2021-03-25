import * as api from './api.js';

const host = 'https://baas.kinvey.com/appdata/kid_SydiKQKE_/pets'
api.settings.host = host;
//=================================================
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


//Form date => {}
export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    return Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}
//===================================================

export async function createPet(body) {
    return await api.post(host, body);
}

export async function getAllPets() {
    return await api.get(host);
}


export async function getMyPets() {
    return await api.get(host + `?query={"owner":"${sessionStorage.getItem('email')}"}`);
}
export async function getOtherPets() {
    return await api.get(host + `?query={"owner":"${sessionStorage.getItem('email')}"}`);
}
export async function getPetsByCategory(category) {
    return await api.get(host + `?query={"category": "${category}" }`);
}
//& "category":"${category}"
//"owner":"${sessionStorage.getItem('email')}" &
//https://baas.kinvey.com/appdata/app_id/pets?query={}&sort={"likes": -1}


export async function getPetById(id) {
    return await api.get(host + '/' + id);
}
export async function editPet(idea_id, body) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.put(host + `/${idea_id}`, body)
}
export async function deletePet(id) {
    console.log(id)
    console.log(host)
    return await api.del(host + '/' + id)
}

//=======================================