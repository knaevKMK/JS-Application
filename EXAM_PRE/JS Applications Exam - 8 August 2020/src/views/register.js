import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFormData, register } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';


const regTemp = (onSubmit, email, pass, rePass) => html `
<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
<div class="form-group">
    <label for="email">Email${email ? ' does not match' : ''}</label>
    <input type="email" class="form-control" placeholder="Email" name="email" value="">
</div>
<div class="form-group">
    <label for="password">Password${pass ? ' does not match' : ''}</label>
    <input type="password" class="form-control" placeholder="Password" name="password" value="">
</div>

<div class="form-group">
    <label for="repeatPassword">Repeat Password ${rePass ? ' does not match' : ''}</label>
    <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
</div>

<button type="submit" class="btn btn-primary">Register</button>
</form>`;
const tempRegisterLogged = () => html `
<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
<h3 style="color: white; text-decoration:white underline;text-align: center;">Successful registration!</h3>
</div>
`;
export function loadRegister(ctx) {
    ctx.render(regTemp(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const data = getFormData(event.target);
        const email = data.email.trim();
        const password = data.password.trim();
        const rePassword = data.repeatPassword.trim();
        if (email == '' || password == '') {
            ctx.render(regTemp(onSubmit,
                email == '',
                password == '',
                rePassword == ''
            ));
            return;
        }
        if (password !== rePassword) {
            ctx.render(regTemp(onSubmit,
                true, false, false
            ));
            return;
        }
        const response = await register(email, password);

        ctx.render(tempRegisterLogged());
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
    }
}