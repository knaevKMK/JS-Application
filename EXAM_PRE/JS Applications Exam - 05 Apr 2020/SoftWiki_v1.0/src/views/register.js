import { html } from '../../node_modules/lit-html/lit-html.js'
import { getFormData, register } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';

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
        const formData = getFormData(event.target);
        console.log(formData);

        const email = formData.email.trim();
        const password = formData.password.trim();
        const rePassword = formData['rep-pass'].trim();

        console.log(email + password + rePassword)
        if (!email.match(/\S+@\S+\.\S+/) ||
            password === '' || rePassword === '') {
            ctx.render(tempRegister(onSubmit))
            return;
        }
        if (password !== rePassword) {
            ctx.render(tempRegister(onSubmit))
            return;
        }
        //   ctx.render(tempLoading('Registering...'));
        //  try {
        const response = await register(email, password);
        console.log(response);
        //   ctx.render(tempSuccess("registration"));
        setTimeout(() => {
            page.redirect('/')
        }, 1000);

        // } catch (err) {


        // }
    }
}