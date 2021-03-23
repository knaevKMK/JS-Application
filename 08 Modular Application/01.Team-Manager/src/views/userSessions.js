import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { login, register, logout, getFormData } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';
import { tempLoading, tempSuccess } from './loading.js';
import { loadFoot, loadHead } from './home&&head&&foot.js';

const tempLogin = (onSubmit, err) => html `<main>
    <section id="login">
        <article class="narrow">
            <header class="pad-med">
                <h1>Login</h1>
            </header>
            <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
                <div class="error">${err ? 'Email and/or Password not match' : ''}</div>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input class="action cta" type="submit" value="Sign In">
            </form>
            <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
            </footer>
        </article>
    </section>
</main>`;
const tempRegister = (onSubmit, email, pass, rePass, username) => html `< main>
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
                <div class="error">${email || username || pass || rePass ? 'Invalid' : ''}
                    ${email ? 'Email' : ''}
                    ${username ? 'Username' : ''}
                    ${pass ? 'Password' : ''}
                    ${rePass ? 'Re-Password' : ''}</div>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
            <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
            </footer>
        </article>
    </section>
    </main>`;

export async function loadLogin(ctx) {

    ctx.render(tempLogin(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const formData = getFormData(event.target);
        console.log(formData);
        const email = formData.email.trim();
        const password = formData.password.trim();

        console.log(email + password)
        if (!email.match(/\S+@\S+\.\S+/) || password === '') {
            ctx.render(tempLogin(onSubmit, true))
            return;
        }
        ctx.render(tempLoading('Login...'));
        try {
            const response = await login(email, password);
            console.log(response);
            ctx.render(tempSuccess('login'));
            setTimeout(() => {
                page.redirect('/myteams')
            }, 1000);
        } catch (err) {
            ctx.render(tempLogin(onSubmit, true));
        }
    }
}
export async function loadRegister(ctx) {
    ctx.render(tempRegister(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const formData = getFormData(event.target);
        console.log(formData);

        const email = formData.email.trim();
        const password = formData.password.trim();
        const rePassword = formData.repass.trim();
        const username = formData.username.trim();
        console.log(email + password + rePassword + username)
        if (!email.match(/\S+@\S+\.\S+/) ||
            password === '' || rePassword === '' || username == '') {
            ctx.render(tempRegister(onSubmit, !email.match(/\S+@\S+\.\S+/), password === '', rePassword === '', username === ''))
            return;
        }
        if (password !== rePassword) {
            ctx.render(tempRegister(onSubmit, false, true, true, false))
            return;
        }
        ctx.render(tempLoading('Registering...'));
        try {
            const response = await register(email, password, username);
            console.log(response);
            ctx.render(tempSuccess("registration"));
            setTimeout(() => {
                page.redirect('/myteams')
            }, 1000);

        } catch (err) {
            ctx.render(tempRegister(onSubmit, false, true, true, false))

        }
    }
}

export async function loadLogout() {
    render([loadHead(), tempLoading('Logout...'), loadFoot()], document.querySelector('main'));
    try {
        const data = await logout();
        console.log(data);
        render([loadHead(), tempSuccess('logout'), loadFoot()], document.querySelector('main'));
    } catch (err) {
        render([loadHead(), tempSuccess('!!!Bad request!!!'), loadFoot()], document.querySelector('main'));
    } finally {
        setTimeout(() => {
            page.redirect('/')
        }, 1000);

    }
}