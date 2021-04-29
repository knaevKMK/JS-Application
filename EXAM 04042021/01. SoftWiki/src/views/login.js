import { lp, api } from '../lib.js';


const tempLogin = (onSubmit) => lp.html ` 
 <section id="login-page" class="content auth">
<h1>Login</h1>

<form @submit=${onSubmit} id="login" action="" method="">
    <fieldset>
        <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
            increase in quantity and, hopefully, in value</blockquote>
        <p class="field email">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">
        </p>
        <p class="field password">
            <label for="login-pass">Password:</label>
            <input type="password" id="login-pass" name="password">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Log in">
        </p>
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </fieldset>
</form>
</section>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            return window.alert('All fields required');
        }
        try {
            await api.data.login(email, password);
                    lp.page.redirect('/');
        } catch (err) {
            return window.alert(err.message);
        }
    }
}