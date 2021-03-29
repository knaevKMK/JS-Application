import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getAllSongs, getMySongs } from '../api/data.js';
import { loadNotification, tempLoading } from './notification.js';

const tempAllSongs = (songs, title) => html `<section id="allSongsView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>${title} Songs</h1>
            <a href="/create">
                <button type="button" class="btn-lg btn-block new-song-btn">Add a new song</button>
            </a>
            ${renderSongs(songs)}

        </div>
    </div>
</section>`;

function renderSongs(songs) {
    let result = (songs
        .filter(s => s._owner != sessionStorage.getItem('email'))
        .sort((a, b) => b.likes - a.likes));

    songs
        .filter(s => s._owner == sessionStorage.getItem('email'))
        .sort((a, b) => {
            let result = b.listen - a.listen;
            if (result == 0) {
                result = b.likes - a.likes;
            }
            return result;
        }).forEach(item => result.push(item));
    return result.map(s => html `<div class="song" id=${s._id}>
    <h5>Title: ${s.title}</h5>
    <h5>Artist: ${s.artist}</h5>
    <img class="cover" src="${s.imageURL}" />
    ${sessionStorage.getItem('email') == s._owner
                ? html`<p>Likes: ${s.likes}; Listened ${s.listen} times</p>
    <a href=""><button type="button" class="btn btn-danger mt-4">Remove</button></a>
    <a href=""><button type="button" class="btn btn-success mt-4">Listen</button></a>`
                : html` <p>Likes: ${s.likes}</p>
    <a href=""><button type="button" class="btn btn-primary mt-4">Like</button></a>`}
</div>`)
}
export async function loadAllSongs(ctx) {
    loadNotification(tempLoading());
    const songs = await getAllSongs();
    console.log(songs);
    ctx.render(tempAllSongs(songs, 'All'));
}

export async function loadMySongs(ctx) {
    loadNotification(tempLoading());
    const songs = await getMySongs();
    console.log(songs);
    ctx.render(tempAllSongs(songs, 'My'));
}