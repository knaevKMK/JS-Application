import { api, lp } from '../lib.js';


const tempProfile = (user) => lp.html `
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${user.mems.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${renderData(user.mems)}
    </div>
</section>
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<p class="no-memes">No memes in database.</p>`;
    }
    return data.map(m => lp.html `<div class="user-meme">
    <p class="user-meme-title">${m.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}">
    <a class="button" href="/details/${m._id}">Details</a>
</div>`);
}

export async function pageProfile(ctx) {
    const user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        gender: sessionStorage.getItem('gender'),
        mems: [],
    };
    user.mems = await api.data.getMyMemes(sessionStorage.getItem('id'));
    ctx.render(tempProfile(user));
}