import { lp, api } from '../lib.js';

//attach submit
const tempRegister = (onSubmit) => lp.html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
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

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/register">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        //check fields + name of input fields

        const password = fd.password.trim();
        const username = fd.username.trim();
        const repeatPass = fd.repeatPass.trim();

        if (
            username == '' ||
            password == '' ||
            repeatPass == ''
        ) {
            return window.alert('All fields required');
        }
        if (password != repeatPass) {
            return window.alert('Passwords don\`t match');
        }
        await api.data.register(
            username,
            password,
        );
        //check redirect
        lp.page.redirect('/catalog');
    }
}