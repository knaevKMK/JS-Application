import { html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { register } from "../api/api.js";
import { getFormData } from "../api/data.js";
import { loadError, loadSuccess } from "./elements/modal.js";


const tempRegister = (onSubmit) => html `<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> You have account? Then just
                    <a href="/login">Sign-In</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export function loadRegister(ctx) {
    console.log('Register')
    ctx.render(tempRegister(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        console.log('Try register');

        const formData = getFormData(event.target);
        console.log(formData);

        const email = formData.username.trim();
        const password = formData.password.trim();
        const rePass = formData.repeatPassword.trim();
        if (email == '' || password == '' || rePass == '') {
            ctx.render(loadError(`Invalid: ${email == '' ? ' Email' : ''}${password == '' ? ' Password' : ''}${rePass == '' ? ' Repeat Password' : ''}`))
            setTimeout(() => {
                ctx.render(tempRegister(onSubmit));
            }, 1000);
            return;
        }
        if (password !== rePass) {
            ctx.render(loadError('Password does not match'))
            setTimeout(() => {
                ctx.render(tempRegister(onSubmit));
            }, 1000);
            return;
        }

        const response = await register(email, password);
        console.log(response);

        // event.target.reset();
        ctx.render(loadSuccess('Register successful!'));
        setTimeout(() => {
            page.redirect('/dashboard');
        }, 1000);
    }
}