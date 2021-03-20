import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFormData, login } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';

const loginTemp = (onSubmit) => html `<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" placeholder="Email" name="email" value="">
</div>
<div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" placeholder="Password" name="password" value="">
</div>

<button type="submit" class="btn btn-primary">Login</button>
</form>`;
const tempLoged = () => html `
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<h3 style="color: white; text-decoration:white underline;text-align: center;">Logged in successfully</h3>
</div>
`;
export function loadLogin(ctx) {
    ctx.render(loginTemp(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const data = getFormData(event.target);
        const email = data.email.trim();
        const password = data.password.trim();
        if (email == '' || password == '') {

            return;
        }
        const response = await login(email, password);
        ctx.render(tempLoged());
        setTimeout(() => {
            page.redirect('/')
        }, 1000);


    }
}