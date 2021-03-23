import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { getArticleById, deleteArticle } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';

const tempDetails = (onDelete, item) => html `<div class="container details">
    <div class="details-content">
        <h2>${item.title}</h2>
        <strong>${item.category}</strong>
        <p>${item.content}</p>
        <div class="buttons">
            ${sessionStorage.getItem('email') === item['creator-email'] ?
        html` <a @click=${onDelete}href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${item._id}" class="btn edit">Edit</a>`
            : ''
        }
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</div>`;

export async function loadDetails(ctx) {
    const itemId = ctx.params.id;
    const response = await getArticleById(itemId);
    console.log(response['creator-email'])

    ctx.render(tempDetails(onDelete, response));
    async function onDelete() {
        const response = await deleteArticle(itemId);
        console.log(response)
        page.redirect('/');
    }

}