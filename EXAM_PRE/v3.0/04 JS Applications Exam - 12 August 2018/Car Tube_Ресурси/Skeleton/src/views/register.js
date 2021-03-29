import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//attach submit
const tempRegister = (onSubmit) => lp.html `<div id="register">
    <form @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <button type="submit" class="registerbtn">Register</button>
        </div>
        <div class="container signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.</p>
        </div>
    </form>
</div>`;

export function pageRegister(ctx) {

    console.log(document.querySelector('#notifications'))

    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);


        const username = fd.username.trim();
        const password = fd.password.trim();
        const repeatPass = fd.repeatPass.trim();

        if (password.length < 6 || username.length < 3 || repeatPass.length < 6) {
            return note(temp.err('Invalid credentials. Please retry request with correct credentials'));
        }
        if (password != repeatPass) {
            return note(temp.err('Passwords don\`t match'));
        }
        try {
            note(temp.loading());
            await api.data.register(username, password);
            note(temp.info('User registration successful.'));
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(temp.err(err.message))
        }
    }
}