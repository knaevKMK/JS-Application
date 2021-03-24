import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getFormData, login } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

const tempLogin = (onSubmit) => html `<section id="loginView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Login</h1>
            <form @submit=${onSubmit}action="" method="">
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input id="username" type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input id="password" type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <h4 class="mt-3 text-white">No account yet? <a href="/register" class="add-link">Register</a></h4>
        </div>
    </div>
</section>`;

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
                page.redirect('/allsongs')
            }, 1000);
        } catch (err) {
            loadNotification(tempError('Bad request'))
            setTimeout(() => {
                page.redirect('/login')
            }, 1000);
        }
    }
}