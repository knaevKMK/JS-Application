import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getFormData, createSong } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';


const tempCreate = (onSubmit) => html `<section id="createSongView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Create new song</h1>
            <form @submit=${onSubmit} action="" method="">
                <div class="form-group">
                    <label for="title" class="white-labels">Title</label>
                    <input id="title" type="text" name="title" class="form-control" placeholder="Title">
                </div>
                <div class="form-group">
                    <label for="artist" class="white-labels">Artist</label>
                    <input id="artist" type="text" name="artist" class="form-control" placeholder="Artist">
                </div>
                <div class="form-group">
                    <label for="imageURL" class="white-labels">imageURL</label>
                    <input id="imageURL" type="text" name="imageURL" class="form-control" placeholder="imageURL">
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</section>`;


export function loadCreate(ctx) {
    ctx.render(tempCreate(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        loadNotification(tempLoading());
        const fd = getFormData(event.target);
        console.log(fd);
        if (fd.artist.trim() == '' || fd.imageURL.trim() == '' || fd.title.trim() == '') {
            loadNotification(tempError('All fields required'));
            return;
        }
        fd._owner = sessionStorage.getItem('email');
        fd.likes = 0;
        fd.listen = 0;
        try {
            const response = await createSong(fd);
            loadNotification(tempInfo('Song created successfully.'));
            page.redirect('/allsongs')
        } catch (err) {
            loadNotification(tempError('Bad request'));
        }

    }
}