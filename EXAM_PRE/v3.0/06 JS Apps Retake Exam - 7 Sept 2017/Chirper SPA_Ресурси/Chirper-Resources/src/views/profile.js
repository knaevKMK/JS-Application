import { api, lp } from '../lib.js';
import { note, temp } from './elements/note.js';

//this user data include all items create by itself
const tempProfile = (onSubmit, onFollow, onDelete, user, chirps, followers, following, me) => lp.html `
<section id=${me ? "viewMe" : "viewProfile"}>
    <div class="content">
        <div class="chirper">

            <h2 class="titlebar">${user.username}</h2>

            ${sessionStorage.getItem('id') == user._id
                ? lp.html`
            <form @submit=${onSubmit} id="formSubmitChirpMy" class="chirp-form">
                <textarea name="text" class="chirp-input"></textarea>
                <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
            </form>
            `
                : lp.html`<a @click=${onFollow} id="btnFollow" class="chirp-author" href="javascript:void(0)">Follow</a>`}

            <div id=${me ? "myStats" : "userProfileStats"} class=${me ? "user-details" : "user-details"}>
                <span>${chirps.length} chirps</span> | <span>${following.length} following</span> | <span>${user.subscriptions.length}
                    followers</span>
            </div>
        </div>
        <div id=${me ? "myChirps" : "profileChirps"} class="chirps">
            <h2 class="titlebar">Chirps</h2>
            <div class="chirp">
                ${renderData(chirps, onDelete, me)}
            </div>
        </div>
    </div>
</section>
`;

function renderData(data, onDelete, me) {
    console.log(data);
    if (data.length == 0) {
        return lp.html`<span class="loading">No chirps in database</span>`;
    }
    return data.map(m => lp.html`<article class="chirp">
    <div class="titlebar">
        <a href="/profile/${m._acl.creator}" class="chirp-author">${m.author}</a>

        <span class="chirp-time">
            ${me ? lp.html`<a id="${m._id}" @click=${onDelete} href="javascript:void(0)"
                class="chirp-author">delete</a>` : ''}
            1 day</span>
    </div>
    <p>${m.text}</p>
</article>`);
}

export async function pageProfile(ctx) {
    const userId = ctx.params.id;
    const user = await api.data.getUser(userId);
    const [chirps, followers,following] = await Promise.all(
        [
            api.data.getMyChirps(user.username),
            api.data.getFollowers(user.username),
            api.data.getFollowing(user.username)
        ]
    );
    console.log(user, chirps)
    const me = sessionStorage.getItem('id') == user._id;

    ctx.render(tempProfile(onSubmit, onFollow, onDelete, user, chirps, followers,following, me));

    async function onSubmit() {
        event.preventDefault();
        const form = event.target;

        const fd = api.data.getFormData(form);

        if (fd.text.trim() == '' || fd.text.trim().length > 150) {
            return note(temp.err('Field text required'));
        }
        const data = {
            author: sessionStorage.getItem('username'),
            text: fd.text
        };

        try {
            const response = await api.data.createChirps(data);
            console.log(response);
            note(temp.info('Chirp published.'));
        } catch (err) {
            note(temp.err(err.message));
        }

    }
    async function onDelete() {
        console.log('delete');
        await api.data.deleteChirps(event.target.id)
        note(temp.info('Successful delete chirp'))
    }
    async function onFollow() {
        console.log('follow')
        const subs = user.subscriptions
        console.log(subs)
        subs.push(sessionStorage.getItem('username'));
        console.log(subs)
        const response = await api.data.follow(userId, { 'subscriptions': subs });
        console.log(response)
    }
}