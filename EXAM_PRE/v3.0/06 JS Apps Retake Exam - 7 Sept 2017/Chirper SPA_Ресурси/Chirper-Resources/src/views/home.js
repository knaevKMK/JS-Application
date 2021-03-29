import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

const tempHome = (onCreate, subs, chirps, followers, following) => lp.html `
<section id="viewFeed">
    <div class="content">
        <div class="chirper">

            <h2 class="titlebar">${sessionStorage.getItem('username')}</h2>

            <form @submit=${onCreate} id="formSubmitChirp" class="chirp-form">
                <textarea name="text" class="chirp-input"></textarea>
                <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
            </form>

            <div id="userStats" class="user-details">
                <span>${chirps.length} chirps</span> | <span>${following.length} following</span> |
                <span>${followers.length}
                    followers</span>
            </div>
        </div>
        <div id="chirps" class="chirps">
            <h2 class="titlebar">Chirps</h2>

            ${renderChirps(subs)}

        </div>
    </div>
</section>`;

function renderChirps(subs) {
    if (subs.length == 0) {
        return lp.html `<h2>No chirps in database</h2>`;
    }
    return subs.map(s => lp.html `<article class="chirp">
    <div class="titlebar">
        <a href="/profile/${s._acl.creator}" class="chirp-author">${s.author}</a>
        <span class="chirp-time">${getDays(s)} day</span>
    </div>
    <p>yohooo</p>
</article>`);
}

function getDays(data) {
    return function calcTime() {
        let dateIsoFormat = data._kmd.lmt;
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

}

export async function pageHome(ctx) {
    //CHECK if redirect after login
    if (sessionStorage.getItem('username') == null) {
        return lp.page.redirect('/register');

    } else {
        lp.page.redirect('/discover');
    }

    const [subs, chirps, followers, following] = await Promise.all([
        api.data.getAllChirps(sessionStorage.getItem('subscriptions')),
        api.data.getMyChirps(sessionStorage.getItem('username')),
        api.data.getFollowers(sessionStorage.getItem('username')),
        api.data.getFollowing(sessionStorage.getItem('username')),

    ]);
    console.log(subs, chirps, followers, following)
    ctx.render(tempHome(onCreate, subs, chirps, followers, following));




    async function onCreate() {
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
}