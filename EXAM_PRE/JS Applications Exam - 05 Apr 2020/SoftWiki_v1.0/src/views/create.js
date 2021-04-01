import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { createArticle, getFormData } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';

const tempCreate = (onSubmit) => html `<div class="container">
    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Create article</legend>
            <p class="field title">
                <input type="text" id="title" name="title" placeholder="Arrays">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" id="category" name="category" placeholder="JavaScript">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content"></textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Create</button>
            </p>

        </fieldset>
    </form>
</div>
`;
// category:
// content:
// creator-email:
// title:


//form
// category: ""
// content: "sdada"
// title: "cdsada"
export async function loadCreate(ctx) {

    ctx.render(tempCreate(onSubmit));

    async function onSubmit() {
        event.preventDefault();

        const formData = getFormData(event.target);
        //   console.log(formData)
        formData['creator-email'] = sessionStorage.getItem('email');

        const data = await createArticle(formData)
        console.log(data);
        page.redirect('/');
    }
}