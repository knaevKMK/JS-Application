import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { editRecord, getFormData, getMovieById } from "../api/data.js";


const editTemp = (onSubmit, item) => html ` <form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
<h1>Edit Movie</h1>
<div class="form-group">
    <label for="title">Movie Title</label>
    <input type="text" class="form-control" placeholder="Movie Title" value=${item.title} name="title">
</div>
<div class="form-group">
    <label for="description">Movie Description</label>
    <textarea class="form-control" placeholder="Movie description..." name="description">${item.description}</textarea>
</div>
<div class="form-group">
    <label for="imageUrl">Image url</label>
    <input type="text" class="form-control" placeholder="Image Url" value=${item.img} name="imageUrl">
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form>`;

const tempSuccessFull = () => html `
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<h3 style=" color: white; text-decoration:white underline;text-align: center;">Edited Successfully</h3>
</div>
`;
export async function loadEdit(ctx) {
    const itemId = ctx.params.id;
    const data = await getMovieById(itemId);
    console.log(data)
    ctx.render(editTemp(onSubmit, data));

    async function onSubmit() {
        event.preventDefault();
        const _data = getFormData(event.target);
        console.log(_data)
        if (_data.title.trim() == '' ||
            _data.imageUrl.trim() == '' ||
            _data.description.trim() == '') {

            return;
        }

        const response = await editRecord(itemId, {
            description: _data.description,
            img: _data.imageUrl,
            title: _data.title
        });
        ctx.render(tempSuccessFull());
        setTimeout(() => {
            page.redirect('/');
        }, 1000);
    }
}