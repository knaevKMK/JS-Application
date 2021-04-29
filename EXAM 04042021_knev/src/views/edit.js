import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//TODO item.proto & attach submit on the form
// notes: err on if & after await
const tempEdit = (item, onSubmit) => lp.html ``;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempEdit(item, onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        // TODO check input fields

        // const title = fd.title.trim();
        // const description = fd.description.trim();
        // const imageUrl = fd.imageUrl.trim();

        //Check if statement

        // if (title == '' || imageUrl == '' || description == '') {
        //     return window.alert('All fields required');
        // }

        try {
            //{}
            //  await api.data.editMeme(itemId, { title, description, imageUrl });
            //Check redirect
            lp.page.redirect('/');
        } catch (err) {
            return window.alert(err.message)
        }
    }
}