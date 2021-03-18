import { html } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';

const tempLogOut = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful logout</h3>
</div>
`;

export async function logOut(ctx) {
    const data = await logout();
    console.log(data);
    ctx.render(tempLogOut());
    setTimeout(() => {
        page.redirect('/')
    }, 1000);
}