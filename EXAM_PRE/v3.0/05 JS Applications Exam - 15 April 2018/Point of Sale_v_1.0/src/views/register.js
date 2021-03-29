import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//attach submit
const tempRegister = (onSubmit) => lp.html `<div class="welcome-forms">
    <div class="welcome-rigister-form">
        <h1>Register</h1>
        <form @submit=${onSubmit} id="register-form">
            <label for="username-register">Username</label>
            <input type="text" name="username-register" id="username-register" placeholder="Username">
            <label for="password-register">Password</label>
            <input type="password" name="password-register" id="password-register" placeholder="Password">
            <label for="password-register-check">Password check</label>
            <input type="password" name="password-register-check" id="password-register-check"
                placeholder="Repeat password">
            <input id="registerBtn" type="submit" value="Register" />
        </form>
    </div>
</div>`;

export function pageRegister(ctx) {
    return (tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        //check fields name
        const email = fd['username-register'].trim();
        const password = fd['password-register'].trim();
        const repeatPass = fd['password-register-check'].trim();


        if (email.length < 5 || password == '') {
            return note(temp.err('All fields required'));
        }
        if (password != repeatPass) {
            return note(temp.err('Passwords don\`t match'));
        }
        try {
            await api.data.register(email, password);
            //check redirect
            note(temp.info('User registration successful.'))
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(temp.err(err.message));
        }
    }
}