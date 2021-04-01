import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO item.proto & attach submit on the form
// notes: err on if & after await
const tempEdit = (item, onSubmit) => lp.html `
<section id="viewEdit">
    <div class="submitArea">
        <h1>Edit Link</h1>
        <p>Please, fill out the form. A thumbnail image/description is not required.</p>
    </div>
    <div class="submitArea formContainer">
        <form @submit=${onSubmit} id="editPostForm" class="submitForm">
            <label>Link URL:</label>
            <input name="url" type="text" value="${item.url}">
            <label>Link Title:</label>
            <input name="title" type="text" value="${item.title}">
            <label>Link Thumbnail Image (optional):</label>
            <input name="imageUrl" type="text" value="${item.imageUrl}">
            <label>Comment (optional):</label>
            <textarea name="description">${item.description}</textarea>
            <input id="btnEditPost" type="submit" value="Edit Post">
        </form>
    </div>
</section>
`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    console.log(item)
    ctx.render(tempEdit(item, onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const title = fd.title.trim();
        const url = fd.url.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();


        if (title == '' || url == '') {
            return note(temp.err('All fields required'));
        }
        const author = _user.getUserData().email;
        await api.data.updateItem(itemId, { title, url, description, imageUrl, author });
        note(temp.info(`Post ${title} updated`));
        lp.page.redirect('/catalog');

    }
}