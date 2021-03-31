import { _user } from '../api/utility.js';
import { api, lp } from '../lib.js';

//this user data include all items create by itself
const tempProfile = (user, userMemes) => lp.html `<main>
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${userMemes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) -->
            ${renderData(userMemes)}
        </div>
    </section>
</main>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<!-- Display : If user doesn't have own memes  -->
<p class="no-memes">No memes in database.</p>`;
    }
    return data.map(m => lp.html `<div class="user-meme">
    <p class="user-meme-title">${m.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}">
    <a class="button" href="/details/${m._id}">Details</a>
</div>`);
}


export async function pageProfile(ctx) {
    const user = _user.getUserData();
    console.log(user)
    const userMemes = await api.data.getMyItems(user._id);
    console.log(userMemes);

    ctx.render(tempProfile(user, userMemes));
}