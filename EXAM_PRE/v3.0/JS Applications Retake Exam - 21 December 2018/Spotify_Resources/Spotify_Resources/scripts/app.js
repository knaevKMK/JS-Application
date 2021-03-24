import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { loadAllSongs, loadMySongs } from './views/allsongs.js';
import { loadCreate } from './views/create.js';
import { loadHeader, loadHome, tempFooter } from './views/home.js';
import { loadLogin } from './views/login.js';

import { loadRegister } from './views/register.js';
import { deleteSong, editSong, getSongById } from './api/data.js';
import { loadNotification, tempInfo, tempLoading } from './views/notification.js';


const main = document.querySelector('#container');

page('/', loadData, loadHome);
page('/create', loadData, loadCreate);
page('/allsongs', loadData, loadAllSongs);
page('/mysongs', loadData, loadMySongs);
page('/register', loadData, loadRegister);
page('/login', loadData, loadLogin);
page('/index.html', loadData, loadHome);

page.start();


function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, tempFooter], main)
    next();
}

window.addEventListener('click', () => {
    if (event.target.tagName == "BUTTON") {
        switch (event.target.textContent) {
            case 'Remove':
                onRemove(event.target.parentNode.parentNode.id);
                break;
            case 'Like':
                onLike(event.target.parentNode.parentNode.id);
                break;
            case 'Listen':
                onListen(event.target.parentNode.parentNode.id);
                break;
        }
    }
})

async function onLike(songId) {
    console.log('like');
    const song = await getSongById(songId);
    // console.log(song);
    const _song = {
        likes: song.likes + 1,
        listen: song.listen,
        title: song.title,
        artist: song.artist,
        imageURL: song.imageURL,
        _owner: song._owner
    }
    const response = await editSong(songId, _song);
    loadNotification(tempInfo('Liked'))
    setTimeout(() => {
        page.redirect(window.location.href.substring(21));
    }, 1500);

}
async function onListen(songId) {
    console.log('listen');
    const song = await getSongById(songId);
    // console.log(song);
    song.listen++;
    const response = await editSong(songId, song)

    loadNotification(tempInfo(`You just listened ${song.title}`));
    setTimeout(() => {
        page.redirect(window.location.href.substring(21));
    }, 1500);
}
// http://127.0.0.1:5500/


async function onRemove(songId) {
    console.log('remove');
    loadNotification(tempLoading);
    const _delete = await deleteSong(songId);
    console.log(_delete);
    loadNotification(tempInfo('Successful deleted'))
    page.redirect(window.location.href.substring(21));
}