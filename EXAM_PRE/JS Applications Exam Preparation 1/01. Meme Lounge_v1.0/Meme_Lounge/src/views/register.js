import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

const tempRegister = (onSubmit) => lp.html `<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const email = fd.email.trim();
        const password = fd.password.trim();
        const username = fd.username.trim();
        const repeatPass = fd.repeatPass.trim();
        const gender = fd.gender;

        if (email == '' || password == '' || username == '' || gender == null) {
            return note('All fields required');
        }
        if (password != repeatPass) {
            return note('Passwords don\`t match');
        }
        try {
            await api.data.register(username, email, password, gender);
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}