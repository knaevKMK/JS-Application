import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    //  [...formData.entries()].forEach(e => console.log(e))
    return [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}
//===========================================================
export async function getArticles() {
    const data = await (await fetch(host + `jsonstore/articles`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result;
}
export async function deleteArticle(id) {
    return await api.del(host + 'jsonstore/articles/' + id)
}

export async function getArticleById(teamId) {
    return await (await fetch(host + `jsonstore/articles/` + teamId)).json();
}
export async function editArticle(itemId, data) {
    const token = sessionStorage.getItem('token');
    console.log(itemId);
    console.log(data);
    return await (await fetch(`http://localhost:3030/jsonstore/articles/${itemId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json()
}
export async function createArticle(data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch('http://localhost:3030/jsonstore/articles', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}
//=================================================