import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { getArticleById, editArticle, getFormData } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';

const tempEdit = (onSubmit, item) => html `<div class="container">

    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Edit article</legend>
            <p class="field title">
                <input type="text" name="title" id="title" placeholder="Arrays" value="${item.title}">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" name="category" id="category" value=${item.category}>
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content">${item.content}</textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Edit</button>
            </p>

        </fieldset>
    </form>
</div>`;

export async function loadEdit(ctx) {
    const itemId = ctx.params.id;

    const data = await getArticleById(itemId);
    console.log(data);
    ctx.render(tempEdit(onSubmit, data));

    async function onSubmit() {
        event.preventDefault();

        const formData = getFormData(event.target);
        console.log(formData);
        //TODO send request
        // category: "JavaScript"
        // content:
        // title: "Gjango"
        formData['creator-email'] = sessionStorage.getItem('email');

        const data = await editArticle(itemId, formData);
        console.log(data)
        page.redirect('/');

    }
}