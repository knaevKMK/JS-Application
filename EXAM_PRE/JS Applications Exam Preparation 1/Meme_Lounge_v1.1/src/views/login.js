import { lp, api } from '../lib.js';
import { note } from './elements/note.js';


//TODO attach submit & redirect for links as login
//check notifications if have r26 r31 35
const tempLogin = (onSubmit) => lp.html `<main>

    <!-- Login Page ( Only for guest users ) -->
    <section id="login">
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
    </section>
</main>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);


        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            return note('All fields required');
        }

        const response = await api.data.login(email, password);
        console.log(response)
        lp.page.redirect('/catalog');

    }
}