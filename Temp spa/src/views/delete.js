import page from "../../node_modules/page/page.mjs";
import { deleteRecord } from "../api/data.js";
import { html } from '../../node_modules/lit-html/lit-html.js';

const deleteSuccessFullTemp = () => html `
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<p style="color: white; text-decoration:white underline;text-align: center;">Deleted successfully</p>
</div>
`;
export async function loadDelete(ctx) {
    const itemId = ctx.params.id;
    console.log(itemId)
    const data = await deleteRecord(itemId);
    console.log(data)
    ctx.render(deleteSuccessFullTemp());
    setTimeout(() => {
        page.redirect('/')
    }, 1000);
}