import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getFormData, login } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

const tempLogin = (onSubmit) => html `<main>
    <section class="login">
        <form @submit=${onSubmit} action="" method="">
            <fieldset>
                <legend>Login</legend>
                <p class="field">
                    <label for="username">Username</label>
                    <span class="input">
                        <input type="text" name="username" id="username" placeholder="Username" />
                        <span class="actions"></span>
                        <i class="fas fa-user"></i>
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password" />
                        <span class="actions"></span>
                        <i class="fas fa-key"></i>
                    </span>
                </p>
                <input class="button" type="submit" class="submit" value="Login" />
            </fieldset>
        </form>
    </section>
</main>`;

export function loadLogin(ctx) {
    ctx.render(tempLogin(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        loadNotification(tempLoading());
        const fd = getFormData(event.target);

        console.log(fd);
        const email = fd.username.trim();
        const password = fd.password.trim();
        if (email == '' || password == '') {
            loadNotification(tempError('Error: all fields required'));
            return;
        }

        try {
            const response = await login(email, password);
            console.log(response)
            loadNotification(tempInfo('Successfully Login'));
            setTimeout(() => {
                page.redirect('/')
            }, 1000);
        } catch (err) {
            loadNotification(tempError('Bad request'))
            setTimeout(() => {
                page.redirect('/login')
            }, 1000);
        }
    }
}