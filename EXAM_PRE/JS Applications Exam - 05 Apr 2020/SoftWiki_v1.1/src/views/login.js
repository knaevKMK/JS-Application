import { html, getFormData, page, login } from '../library/import.js'


const tempLogin = (onSubmit) => html `<div class="container auth">
    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Login</legend>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can increase in
                quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" id="login-pass" name="password">
                <label for="login-pass">Password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Log In</button>
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="register">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`;

export function loadLogin(ctx) {

    ctx.render(tempLogin(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target)
        console.log(fd);
        const email = fd.email.trim();
        const password = fd.password.trim();
        if (email == '' || password == '') {
            return;
        }
        try {
            await login(email, password);
            page.redirect('/');
        } catch (err) { console.log(err.message) }
    }
}