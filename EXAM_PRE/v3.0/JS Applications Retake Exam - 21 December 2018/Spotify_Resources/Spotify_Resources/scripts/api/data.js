import * as api from './api.js';

const host = 'https://baas.kinvey.com/appdata/kid_Hylxjsd4_/songs'
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

export async function createSong(body) {
    return await api.post(host, body);
}

export async function getAllSongs() {
    return await api.get(host);
}


export async function getMySongs() {
    return await api.get(host + `?query={"_owner":"${sessionStorage.getItem('email')}"}`);
}



export async function getSongById(id) {
    return await api.get(host + '/' + id);
}
export async function editSong(idea_id, body) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.put(host + `/${idea_id}`, body)
}
export async function deleteSong(id) {
    console.log(id)
    console.log(host)
    return await api.del(host + '/' + id)
}