import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { editShoe, getCatalog, getShoeById } from "../api/data.js";
import { detailsTemp } from "./details.js";



export async function loadBuy(ctx) {

    const itemId = ctx.params.id;
    const data = await getShoeById(itemId);

    console.log(data.bought);
    data.bought++;
    console.log(data.bought);
    const buyIt = await editShoe(itemId, data);
    console.log(buyIt)
    ctx.render(detailsTemp(buyIt, true));
    setTimeout(() => {
        page.redirect(`/details/${itemId}`)
    }, 1000);

}

const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">You successful buy this item</h3>
</div>
`;