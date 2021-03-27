import { html } from "../../node_modules/lit-html/lit-html.js";
import { createRecord, getFormData } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';



const createMovieTemp = (onSubmit, invalid) => html `<form  @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
${invalid
        ? html`
<div class="form-group" style="display: inline-flexbox; background-color:red;">
<p style=" color: white; text-decoration:white underline;text-align: center;">Invalid Inputs</p>
</div>
`
        : ''}
<h1>Add Movie</h1>
<div class="form-group">
    <label for="title">Movie Title</label>
    <input type="text" class="form-control" placeholder="Title" name="title" value="">
</div>
<div class="form-group">
    <label for="description">Movie Description</label>
    <textarea class="form-control" placeholder="Description" name="description"></textarea>
</div>
<div class="form-group">
    <label for="imageUrl">Image url</label>
    <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form>`;
const tempSuccessFull = () => html`
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<p style=" color: white; text-decoration:white underline;text-align: center;">Created Successfully</p>
</div>
`;
export function loadAddMovie(ctx) {
    ctx.render(createMovieTemp(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const data = getFormData(event.target);
        console.log(data)
        if (data.title.trim() == '' ||
            data.imageUrl.trim() == '' ||
            data.description.trim() == '') {
            ctx.render(createMovieTemp(onSubmit, true));

            return;
        }

        const response = await createRecord({
            description: data.description,
            img: data.imageUrl,
            title: data.title
        });
        ctx.render(tempSuccessFull());
        setTimeout(() => {
            page.redirect('/');
        }, 1000);
        console.log(response);
    }
}