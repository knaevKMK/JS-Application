import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//TODO attach the submit on the form
const tempCreate = (onSubmit) => lp.html ``;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        //TODO check object.proto
        const title = fd.title.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();

        //TODO CHECK IF & NOTE
        if (title == '' || imageUrl == '' || description == '') {
            return note('All fields required');
        }
        try {
            await api.data.createItem({ title, description, imageUrl });
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}