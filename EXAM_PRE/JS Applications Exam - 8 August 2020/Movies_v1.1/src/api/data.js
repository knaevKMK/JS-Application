import * as api from './api.js';

const host='http://localhost:3030/';
api.settings.host=host;
export const login= api.login;
export const logout=api.logout;
export const register=api.register;


export function getFormData(form){
    const formData = new FormData(form);
    return [...formData.entries()].reduce((a,[k,v])=>Object.assign(a,{[k]:v}),{});
}

export async function getAllMovies(){
    return await api.get(host+'data/movies')
}

export async function getMovieById(id){
    return await api.get(host+'data/movies/'+id);
}

export async function addMovie(data){
    return await api.post(host+"data/movies",data);
}
export async function editMovie(id,body){
    return await api.put(host+"data/movies/"+id, body);
}
export async function deleteMovie(id){
    return await api.del(host+"data/movies/"+id)
}
export async function createLike(movieId) {
    return await api.post(host + 'data/likes', { _movieId: movieId });
}


export async function getCommentsByRecipeId(id) {
    const userId = sessionStorage.getItem('id');
    if (userId == null) {
        return;
    }
    return await api.get(host + `data/likes?where=_movieId%3D%22${id}%22`)
}
export async function getSearch(title) {

    return await api.get(host + `data/movies?where=title%3D%22${title}%22`)
}