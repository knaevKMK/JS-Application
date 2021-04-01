import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;



//createRecord
//work
export async function createRecord(data) {

    await (await fetch('http://localhost:3030/jsonstore/shoes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })).json();
}

//use for get all data
//work
export async function getCatalog() {
    const data = await (await fetch(host + `jsonstore/shoes/`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result;
}

// get by item Id
//work
export async function getShoeById(itemId) {
    return await (await fetch(host + `jsonstore/shoes/` + itemId)).json();
}


//DELETE RECEORD
//WORK
export async function deleteRecord(id) {
    return await api.del(host + 'jsonstore/shoes/' + id)
}


//edit by item Id
// work
export async function editShoe(itemId, data) {
    const token = sessionStorage.getItem('token');
    console.log(itemId);
    console.log(data);
    return await (await fetch(`http://localhost:3030/jsonstore/shoes/${itemId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            // 'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json()
}



export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    return Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}