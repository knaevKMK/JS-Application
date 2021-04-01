import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

const tempHome = (onRegister, onLogin) => lp.html `
    <section id="viewWelcome">
        <div class="welcome">
            <div class="signup">
                <form @submit=${onLogin} id="loginForm">
                    <h2>Sign In</h2>
                    <label>Username:</label>
                    <input name="username" type="text">
                    <label>Password:</label>
                    <input name="password" type="password">
                    <input id="btnLogin" value="Sign In" type="submit">
                </form>
                <form @submit=${onRegister} id="registerForm">
                    <h2>Register</h2>
                    <label>Username:</label>
                    <input name="username" type="text">
                    <label>Password:</label>
                    <input name="password" type="password">
                    <label>Repeat Password:</label>
                    <input name="repeatPass" type="password">
                    <input id="btnRegister" value="Sign Up" type="submit">
                </form>
            </div>
    
            <div class="about">
                <h1>Welcome to SeenIt</h1>
                <p>
                    Share interesting links and discuss great content. It's what's happening now.
                </p>
                <p>Sign in or sign up in a second.</p>
            </div>
        </div>
    </section>
`;

export async function pageHome(ctx) {
    //CHECK if redirect after login

    if (sessionStorage.getItem('user') != null) {
        lp.page.redirect('/catalog')
    }
    ctx.render(tempHome(onRegister, onLogin));



}
async function onRegister() {
    event.preventDefault();

    const fd = api.data.getFormData(event.target);
    console.log(fd);

    //check fields + name of input fields

    const password = fd.password.trim();
    const username = fd.username.trim();
    const repeatPass = fd.repeatPass.trim();

    if (
        password == '' ||
        username == '' ||
        repeatPass == null
    ) {
        return note(temp.err('All fields required'));
    }
    if (password != repeatPass) {
        return note(temp.err('Passwords don\`t match'));
    }
    try {
        await api.data.register(
            username,
            password,

        );

        note(temp.info('User registration successful.'))

        //check redirect
        lp.page.redirect('/catalog');
    } catch (err) {
        return window.alert(err.message)
    }
}
async function onLogin() {
    event.preventDefault();
    const fd = api.data.getFormData(event.target);
    console.log(fd);

    const username = fd.username.trim();
    const password = fd.password.trim();

    if (username == '' || password == '') {
        return note(temp.err('All fields required'));
    }
    try {
        await api.data.login(username, password);
        //TODO notifications
        note(temp.info('Login successful.'));
        //check redirect home or catalog(all Items)
        lp.page.redirect('/catalog');
    } catch (err) {
        return note(temp.err(err.message));
    }
}