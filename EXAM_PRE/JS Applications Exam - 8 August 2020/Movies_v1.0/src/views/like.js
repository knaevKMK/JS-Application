import { createLike } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';
import { html } from "../../node_modules/lit-html/lit-html.js";

const tempSuccess = () => html `
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<h3 style="color: white; text-decoration:white underline;text-align: center;">Successful liked</h3>
</div>
`;


export async function loadLike(ctx) {
    const itemId = ctx.params.id;
    const response = await createLike(itemId);
    //    console.log('liked: ' + response);
    ctx.render(tempSuccess());
    setTimeout(() => {
        page.redirect(`/details/${itemId}`);
    }, 1000);
}