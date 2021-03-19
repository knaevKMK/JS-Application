import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { getCatalog } from "../api/data.js";



export function loadBuy(ctx) {
    const itemId = ctx.params.id;
    ctx.render(tempSuccess());
    setTimeout(() => {
        page.redirect(`/details/${itemId}`)
    }, 1000);

}

const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">You successful buy this item</h3>
</div>
`;