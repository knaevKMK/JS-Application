import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { deleteRecord, getCatalog } from "../api/data.js";

export async function loadDelete(ctx) {
    const itemId = ctx.params.id;
    const response = await deleteRecord(itemId);
    console.log(response)
    ctx.render(tempSuccess());
    setTimeout(() => {
        page.redirect('/')
    }, 1000);
}
const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful deleted</h3>
</div>
`;