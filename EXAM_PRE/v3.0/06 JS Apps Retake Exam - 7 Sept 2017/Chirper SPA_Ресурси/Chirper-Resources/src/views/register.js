import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//attach submit
const tempRegister = (onSubmit) => lp.html `
    <section id="viewRegister">
        <div class="content">
            <form @submit=${onSubmit} class="form" id="formRegister">
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <label>Repeat Password</label>
                <input name="repeatPass" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a href="login">Log in</a>
            </form>
        </div>
    </section>`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const form = event.target;
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        //check fields name
        const username = fd.username.trim();
        const password = fd.password.trim();
        const repeatPass = fd.repeatPass.trim();

        if (username.length < 3 || password == '' || repeatPass == '') {
            return note(temp.err('All fields required'));
        }
        if (password != repeatPass) {
            return note(temp.err('Passwords don\`t match'));
        }
        try {
            await api.data.register(username, password);
            note(temp.info('User registration successful.'));
            form.reset();
            lp.page.redirect('/');
        } catch (err) {
            return note(temp.err(err.message));
        }
    }
}