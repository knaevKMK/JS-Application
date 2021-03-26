import { html, getFormData, page, register } from '../library/import.js'


const tempRegister = (onSubmit) => html `
    <div class="container auth">
        <form @submit=${onSubmit} action="" method="">
            <fieldset>
                <legend>Register</legend>
                <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up. It
                    increases by diffusion and grows by dispersion.</blockquote>
                <p class="field email">
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
                    <label for="email">Email:</label>
                </p>
                <p class="field password">
                    <input type="password" name="password" id="register-pass">
                    <label for="register-pass">Password:</label>
                </p>
                <p class="field password">
                    <input type="password" name="rep-pass" id="rep-pass">
                    <label for="rep-pass">Repeat password:</label>
                </p>
                <p class="field submit">
                    <button class="btn submit" type="submit">Register</button>
                </p>
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </div>`;

export function loadRegister(ctx) {

    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target)
        console.log(fd);
        const email = fd.email.trim();
        const password = fd.password.trim();
        const re_password = fd['rep-pass'].trim();
        if (email == '' || password == '' || re_password == '') {
            return;
        }
        if (password != re_password) {
            return;
        }
        try {
            await register(email, password);
            page.redirect('/');
        } catch (err) { console.log(err.message) }
    }
}