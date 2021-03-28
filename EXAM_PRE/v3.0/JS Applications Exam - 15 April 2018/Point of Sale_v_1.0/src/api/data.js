import * as api from './api.js';
const host = 'http://localhost:3030/';
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

async function _createReceipt(data) {
    await api.post(host + `data/entries`, data);
}

export async function afterLogin() {

    let result = await getAllItems();
    result = result.find(r => r.active);
    console.log(result)
    if (result.length == 0) {
        result = await _createReceipt({
            active: true,
            productCount: 0,
            total: 0
        })
    }
    return result;
}

export async function getAllItems() {
    const userId = sessionStorage.getItem('id');
    const data = await (await fetch(host + `data/receipts`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    result = result.filter(r => r.creator == userId);
    return result;
}

export async function getEntriesByReceiptId(id) {
    console.log(id)
    const data = await (await fetch(host + `data/entries?query={"receiptId":"${id}"}`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result.filter(r => r.receiptId == id);
}

export async function deleteEntry(id) {
    console.log(id)
    return await api.del(host + 'data/entries/' + id)
}

export async function getItemById(teamId) {
    return await (await fetch(host + `data/receipts/` + teamId)).json();
}



export async function editItem(itemId, data) {
    const token = sessionStorage.getItem('token');
    console.log(itemId);
    console.log(data);
    return await (await fetch(host + `data/receipts/${itemId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json()
}
export async function createEntry(data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch(host + 'data/entries', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}
//=================================================