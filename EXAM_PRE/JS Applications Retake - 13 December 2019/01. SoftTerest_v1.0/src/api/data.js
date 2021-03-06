import * as api from './api.js';

const host = 'https://baas.kinvey.com/appdata/kid_HkzTFA44O'
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

//Work all Ideas
export async function getAllIdeas() {
    return await api.get(host + '/ideas');
}
//Work a Idea
export async function getIdeaById(id) {
    return await api.get(host + '/ideas/' + id);
}
//Work Create Idea
export async function createIdea(body) {
    return await api.post(host + '/ideas/', body);
}
export async function deleteIdea(id) {
    return await api.del(host + '/ideas/' + id)
}
export async function getUserIdeas(user_id) {
    return await api.get(host + `/ideas?query={"_acl.creator":"${user_id}"}`)
}
export async function editIdea(idea_id, body) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.put(host + `/ideas/${idea_id}/`, body)
}
//END
//==================================================================



export async function createLike(movieId) {
    return await api.post(host + 'data/likes', { _movieId: movieId });
}
export async function createRecord(data) {
    return await api.post(host + 'data/movies', data);
}

export async function editRecord(id, data) {
    return await api.put(host + 'data/movies/' + id, data);
}