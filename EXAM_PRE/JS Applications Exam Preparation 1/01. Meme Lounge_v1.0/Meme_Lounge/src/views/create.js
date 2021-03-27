import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

const tempCreate = (onSubmit) => lp.html `<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const title = fd.title.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();

        if (title == '' || imageUrl == '' || description == '') {
            return note('All fields required');
        }
        try {
            await api.data.createMeme({ title, description, imageUrl });
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}