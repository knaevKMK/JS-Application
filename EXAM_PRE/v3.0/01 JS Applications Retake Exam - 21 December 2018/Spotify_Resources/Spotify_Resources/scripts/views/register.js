import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { register } from '../api/api.js';
import { getFormData } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

const tempRegister = (onSubmit) => html `<section id="registerView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Register</h1>
            <form @submit=${onSubmit} action="" method="">
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <h4 class="mt-3 text-white">Already have an account? <a href="/login" class="add-link">Login</a></h4>
        </div>
    </div>
</section>`;

export function loadRegister(ctx) {
    ctx.render(tempRegister(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        loadNotification(tempLoading());

        const fd = getFormData(event.target);
        console.log(fd);

        const email = fd.username.trim();
        const password = fd.password.trim();
        if (email == '' || email.length < 3 || password == '' || password.length < 6) {
            loadNotification(tempError("Error: all fields required"))
            return;
        }
        try {
            const response = await register(email, password);
            console.log(response)
            loadNotification(tempInfo('Successfully Register'));
            setTimeout(() => {
                page.redirect('/allsongs')
            }, 1000);
        } catch (err) {
            loadNotification(tempError('Bad request'))
            setTimeout(() => {
                page.redirect('/register')
            }, 1000);
        }
    }
}