import { lp, api } from '../lib.js';


const tempRegister = (onSubmit) => lp.html` 
<section id="register-page" class="content auth">
    <h1>Register</h1>

    <form @submit=${onSubmit} id="register" action="" method="">
        <fieldset>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="register-pass">Password:</label>
                <input type="password" name="password" id="register-pass">
            </p>
            <p class="field password">
                <label for="register-rep-pass">Repeat password:</label>
                <input type="password" name="rep-pass" id="register-rep-pass">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Register">
            </p>
            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const email = fd.email.trim();
        const password = fd.password.trim();
        const repeatPass = fd['rep-pass'].trim();

        if (
            email == '' ||
            password == '' ||
            repeatPass == ''
        ) {
            return window.alert('All fields required');
        }
        if (password != repeatPass) {
            return window.alert('Passwords don\`t match');
        }
       
            await api.data.register(
                email,
                password,
             
            );

            lp.page.redirect('/');
      
    }
}