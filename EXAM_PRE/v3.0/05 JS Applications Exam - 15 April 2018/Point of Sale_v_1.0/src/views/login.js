import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO attach submit
const tempLogin = (onSubmit) => lp.html `<div class="welcome-forms">
    <div class="welcome-login-form">
        <h1>Sign in</h1>
        <form @submit=${onSubmit}id="login-form">
            <label for="username-login">Username</label>
            <input type="text" name="username-login" id="username-login" placeholder="Username">
            <label for="password-login">Password</label>
            <input type="password" name="password-login" id="password-login" placeholder="Password">
            <input id="loginBtn" type="submit" value="Login" />
        </form>
    </div>
</div>`;



export function pageLogin() {

    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // Check fields name
        const email = fd['username-login'].trim();
        const password = fd['password-login'].trim();

        if (email == '' || password == '') {
            note(temp.err('All fields required'));
            return;
        }
        try {
            await api.data.login(email, password);
            note(temp.info('Login successful.'));
            //check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            note(temp.err(err.message));
            return;
        }
    }
    return (tempLogin(onSubmit));
}