import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

const tempLogin = (onSubmit) => lp.html `<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            note('All fields required');
            return;
        }
        try {
            await api.data.login(email, password);
            lp.page.redirect('/catalog');
        } catch (err) {
            note(err.message);
            return
        }
    }
}