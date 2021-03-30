import { lp, api } from '../lib.js';
import { note } from './elements/note.js';


//TODO attach submit
const tempLogin = (onSubmit) => lp.html `<main id="site-content">
    <section id="login">
        <div class="container">
            <form @submit=${onSubmit} id="login-form" action="" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
</main>`;



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
            window.alert('All fields required');
            return;
        }
        try {
            await api.data.login(username, password);
            //check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            window.alert(err.message);
            return
        }
    }
}