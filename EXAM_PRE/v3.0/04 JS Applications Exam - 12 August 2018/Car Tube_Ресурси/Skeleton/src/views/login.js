import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO attach submit
const tempLogin = (onSubmit) => lp.html `<div id="login">
    <form @submit=${onSubmit} action="" method="post">
        <div class="container">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <button type="submit" class="registerbtn">Login</button>
        </div>

        <div class="container signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.</p>
        </div>
    </form>
</div>
`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // Check fields name
        const email = fd.username.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            return note(temp.err('Invalid credentials. Please retry request with correct credentials'));
        }
        try {
            note(temp.loading());
            await api.data.login(email, password);
            note(temp.info('Login successful.'));
            //check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            note(err.message);
            return
        }
    }
}