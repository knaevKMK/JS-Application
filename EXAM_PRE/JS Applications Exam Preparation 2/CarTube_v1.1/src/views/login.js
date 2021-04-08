import { lp, api } from '../lib.js';


//TODO attach submit & redirect for links as login
//check notifications if have r26 r31 35
const tempLogin = (onSubmit) => lp.html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="" method="">
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
</section>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        // Check fields name USERNAME or PASSWORD rename with F2

        const username = fd.username.trim();
        const password = fd.password.trim();

        if (username == '' || password == '') {
            return window.alert('All fields required');
        }
        try {
            await api.data.login(username, password);
            //TODO notifications

            //check redirect home or catalog(all Items)
            lp.page.redirect('/catalog');
        } catch (err) {
            return window.alert(err.message);
        }
    }
}