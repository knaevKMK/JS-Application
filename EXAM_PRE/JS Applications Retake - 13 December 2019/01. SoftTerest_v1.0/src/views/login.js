import { html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { getFormData, login } from "../api/data.js";
import { loadSuccess, loadError } from "./elements/modal.js";


const tempLogin = (onSubmit) => html `
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <div class="form-label-group">
                <label for="inputUsername">Username</label>
                <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
                    required="">
            </div>
            <div class="text-center mb-4 text-center">
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/register">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export function loadLogin(ctx) {
    console.log('Login')
    ctx.render(tempLogin(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        console.log('Try login')
        const formData = getFormData(event.target);

        const email = formData.username.trim();
        const password = formData.password.trim();
        if (email == '' || password == '') {
            ctx.render(loadError(`Invalid: ${email == '' ? ' Email' : ''}${password == '' ? ' Password' : ''}`))
            setTimeout(() => {
                ctx.render(tempLogin(onSubmit));
            }, 1000);
            return;
        }

        try {
            const response = await login(email, password);

        } catch (err) {
            ctx.render(loadError(`Invalid: ${email == '' ? ' Email' : ''}${password == '' ? ' Password' : ''}`))
            setTimeout(() => {
                ctx.render(tempLogin(onSubmit));
            }, 1000);
            return;
        }
        ctx.render(loadSuccess('Login successful!'));
        setTimeout(() => {
            page.redirect('/dashboard');
        }, 1000);

    }
}