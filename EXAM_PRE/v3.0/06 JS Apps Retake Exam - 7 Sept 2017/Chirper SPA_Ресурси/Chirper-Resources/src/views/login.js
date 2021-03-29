import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO attach submit
const tempLogin = (onSubmit) => lp.html `
<section id="viewLogin">
    <div class="content">
        <form @submit=${onSubmit} id="formLogin" class="form">
            <label>Username</label>
            <input name="username" type="text">
            <label>Password</label>
            <input name="password" type="password">
            <input id="btnLogin" value="Sign In" type="submit">
            <a href="/register">Register</a>
        </form>
    </div>
</section>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // Check fields name
        const username = fd.username.trim();
        const password = fd.password.trim();

        if (username == '' || password == '') {
            note(temp.err('All fields required'));
            return;
        }
        try {
            await api.data.login(username, password);
            note(temp.info('Login successful.'))
            lp.page.redirect('/');
        } catch (err) {
            note(temp.err(err.message));
            return
        }
    }
}