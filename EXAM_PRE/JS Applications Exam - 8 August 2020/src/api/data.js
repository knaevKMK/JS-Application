import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getMovies() {
    return await api.get(host + 'data/movies')
}
export async function getMovieById(id) {
    return await api.get(host + 'data/movies/' + id);
}

export async function getCommentsByRecipeId(id) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.get(host + `data/likes?where=_movieId%3D%22${id}%22`)
}
export async function createLike(movieId) {
    return await api.post(host + 'data/likes', { _movieId: movieId });
}
export async function createRecord(data) {
    return await api.post(host + 'data/movies', data);
}

export async function editRecord(id, data) {
    return await api.put(host + 'data/movies/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del(host + 'data/movies/' + id)
}

export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    return Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}