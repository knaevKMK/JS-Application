import { api, lp } from '../lib.js';

//this user data include all items create by itself
const tempProfile = (user) => lp.html ``;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html ``;
    }
    return data.map(m => lp.html ``);
}

export async function pageProfile(ctx) {
    const user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        gender: sessionStorage.getItem('gender'),
        mems: [],
    };
    user.mems = await api.data.getMyItems(sessionStorage.getItem('id'));
    ctx.render(tempProfile(user));
}