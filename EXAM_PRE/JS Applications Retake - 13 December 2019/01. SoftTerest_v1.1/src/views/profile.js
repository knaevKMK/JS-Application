import { _user } from '../api/utility.js';
import { api, lp } from '../lib.js';

//this user data include all items create by itself
const tempProfile = (user, userIdeas) => lp.html `<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="profile home-text col-md-6 text-center col-lg">
        <img class="profile-img" src="./images/user.png" />
        <div class="profile-info">
            <p>Username: <small>${user.username}</small></p>
            <p class="infoType">Has ${userIdeas.length}ideas =)</p>
            ${renderData(userIdeas)}
        </div>
    </div>
</div>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<p>No ideas yet</p>`;
    }
    return data.map(m => lp.html `<p>${m.name}</p>`);
}


export async function pageProfile(ctx) {
    const user = _user.getUserData()
    const userIdeas = await api.data.getMyItems();
    //TODO what want the exercise
    ctx.render(tempProfile(user, userIdeas));
}