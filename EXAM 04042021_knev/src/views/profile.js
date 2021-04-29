import { _user } from '../api/utility.js';
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
    const user = _user.getUserData()
        //TODO what want the exercise
    ctx.render(tempProfile(user));
}