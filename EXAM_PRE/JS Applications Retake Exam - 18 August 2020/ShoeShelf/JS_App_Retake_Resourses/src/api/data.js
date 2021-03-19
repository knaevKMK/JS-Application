import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getShoes(query) {
    // if (query) {
    //     console.log(query)
    //     return await api.get(host + 'jsonstore/shoes?where=' + encodeURIComponent(`title LIKE "${query}"`))

    // } else {
    return await api.get(host + 'jsonstore/shoes')

    // }
}
export async function getMovieById(id) {
    return await api.get(host + 'data/movies/' + id);
}

export async function getCommentsByRecipeId(id) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.get(host + `jsonstore/shoes/catalog/likes?where=_id%3D%22${id}%22`)
}

//use for get all data

export async function getCatalog() {
    return await (await fetch(host + `jsonstore/shoes/catalog`)).json();
}


export async function getShoeById(itemId) {
    const catalog = await getCatalog();
    return catalog.find(i => i._id == itemId);
}
////////////////////

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
    return await api.del(host + 'jsonstore/shoes/catalog' + id)
}

export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    return Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}