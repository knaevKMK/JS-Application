import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserIdeas } from '../api/data.js';

const tempProfile = (data) => html `<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="profile home-text col-md-6 text-center col-lg">
        <img class="profile-img" src="./images/user.png" />
        <div class="profile-info">
            <p>Username: <small>${data.name}</small></p>
            ${renderIdeas(data.ideas)}
        </div>
    </div>
</div>`;

function renderIdeas(ideas) {
    if (ideas.lenght == 0) {
        return html `<p>No ideas yet</p>`;
    }
    return html `<p class="infoType">Has ${ideas.length} idea${ideas.length > 1 ? 's' : ''} =)</p>
${ideas.map(i => html` <p>${i.name}</p>`)}`
}

export async function loadProfile(ctx) {
    console.log('Profile');

    const id = sessionStorage.getItem('id');
    if (id == null) {
        return;
    }
    const myIdes = await getUserIdeas(id);
    let data = {
        name: sessionStorage.getItem('email'),
        ideas: myIdes
    };

    ctx.render(tempProfile(data));
}