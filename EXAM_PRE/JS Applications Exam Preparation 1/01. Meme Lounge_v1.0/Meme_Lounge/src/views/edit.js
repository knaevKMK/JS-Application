import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

const tempEdit = (m, onSubmit) => lp.html `<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value="${m.title}">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                        ${m.description}
                    </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${m.imageUrl}">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function pageEdit(ctx) {
    const memId = ctx.params.id;
    const mem = await api.data.getAMemeById(memId)
    ctx.render(tempEdit(mem, onSubmit));

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
            await api.data.editMeme(memId, { title, description, imageUrl });
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}