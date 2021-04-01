import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO attach the submit on the form
// notifications on if and after await and in the catch
const tempCreate = (onSubmit) => lp.html `
<section id="viewSubmit">
    <div class="submitArea">
        <h1>Submit Link</h1>
        <p>Please, fill out the form. A thumbnail image is not required.</p>
    </div>
    <div class="submitArea formContainer">
        <form @submit=${onSubmit} id="submitForm" class="submitForm">
            <label>Link URL:</label>
            <input name="url" value="" type="text">
            <label>Link Title:</label>
            <input name="title" value="" type="text">
            <label>Link Thumbnail Image (optional):</label>
            <input name="imageUrl" value="" type="text">
            <label>Comment (optional):</label>
            <textarea name="description"></textarea>
            <input id="btnSubmitPost" value="Submit" type="submit">
        </form>
    </div>
</section>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        //TODO check object.proto


        const title = fd.title.trim();
        const url = fd.url.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();


        if (title == '' || url == '') {
            return note(temp.err('All fields required'));
        }
        const author = _user.getUserData().email;
        const _ownerId = _user.getUserData()._id;
        const _createdOn = new Date(Date.now());

        await api.data.createItem({ title, url, description, imageUrl, author, _ownerId, _createdOn });
        note(temp.info('Post created.'));
        //redirect
        lp.page.redirect('/catalog');

    }
}