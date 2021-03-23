import { html } from '../../node_modules/lit-html/lit-html.js'
import { getFormData, login } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';

const tempLogin = (onSubmit) => html `<div class="container auth">
    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Login</legend>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can increase in
                quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" id="login-pass" name="password">
                <label for="login-pass">Password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Log In</button>
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`;

export function loadLogin(ctx) {
    ctx.render(tempLogin(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const formData = getFormData(event.target);
        console.log(formData);

        const email = formData.email.trim();
        const password = formData.password.trim();

        console.log(email + password)
        if (!email.match(/\S+@\S+\.\S+/) || password === '') {
            //   ctx.render(tempLogin(onSubmit, true))
            return;
        }
        //    ctx.render(tempLoading('Login...'));
        // try {
        const response = await login(email, password);
        console.log(response);
        //    ctx.render(tempSuccess('login'));
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
        // } catch (err) {
        //     ctx.render(tempLogin(onSubmit, true));
        // }
    }
}