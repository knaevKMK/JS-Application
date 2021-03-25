import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { register, getFormData } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

const tempRegister = (onSubmit) => html `<main>
    <section class="register">
        <form @submit=${onSubmit} action="" method="">
            <fieldset>
                <legend>Register</legend>
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
                <input class="button" type="submit" class="submit" value="Register" />
            </fieldset>
        </form>
    </section>
</main>`;

export function loadRegister(ctx) {
    ctx.render(tempRegister(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        loadNotification(tempLoading());

        const fd = getFormData(event.target);
        console.log(fd);

        const email = fd.username.trim();
        const password = fd.password.trim();
        if (email == '' || email.length < 3 || password == '' || password.length < 3) {
            loadNotification(tempError("Error: all fields required"))
            return;
        }
        try {
            const response = await register(email, password);
            console.log(response)
            loadNotification(tempInfo('Successfully Register'));
            setTimeout(() => {
                page.redirect('/')
            }, 1000);
        } catch (err) {
            loadNotification(tempError('Bad request'))
            setTimeout(() => {
                page.redirect('/register')
            }, 1000);
        }
    }
}