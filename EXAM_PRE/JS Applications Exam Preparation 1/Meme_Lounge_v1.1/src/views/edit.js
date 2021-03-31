import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//TODO item.proto & attach submit on the form
// notes: err on if & after await
const tempEdit = (item, onSubmit) => lp.html `<main>
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value="${item.title}">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                ${item.description}
                        </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"
                    value="${item.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
</main>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempEdit(item, onSubmit));


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


        await api.data.updateItem(itemId, { title, description, imageUrl });

        lp.page.redirect('/details/' + itemId);

    }
}